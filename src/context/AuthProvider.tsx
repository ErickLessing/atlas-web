import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { TUser } from "../types/user.types";
import { useQuery } from "@tanstack/react-query";
import { Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: TUser | null;
  authLoading: boolean;
  authError: string | null;
  setAuthError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      setAuthLoading(true);
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session?.user) {
          setSession(sessionData.session);
        } else {
          setSession(null);
        }
      } catch (error) {
        setAuthError("Failed to fetch session: " + JSON.stringify(error));
        setSession(null);
      } finally {
        setAuthLoading(false);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setSession(session);
        } else {
          setSession(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile from Supabase using TanStack Query
  const { data: userProfile } = useUserProfile(session?.user?.id || null);

  useEffect(() => {
    if (userProfile) setUser(userProfile);
  }, [userProfile]);

  const signup = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) throw error;
      else if (data.user) {
        console.log("Sign-up successful: ", data.user);
        const { error: insertError } = await supabase.from("users").insert({
          id: data.user.id,
          name,
        });
        if (insertError) throw insertError;
        console.log("User successfully signed up & saved to public.users");
      }
    } catch (error) {
      setAuthError("Failed to sign up: " + JSON.stringify(error));
      setAuthLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setAuthLoading(true);
      setAuthError(null);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      else if (data.user) {
        console.log("Login successful: ", data.user);
      }
    } catch (error) {
      setAuthError("Failed to login: " + JSON.stringify(error));
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      setAuthLoading(true);
      setAuthError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      setAuthError("Failed to logout: " + JSON.stringify(error));
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    if (authError) console.error(authError);
  }, [authError]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        authError,
        setAuthError,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// Moved useUserProfile out of AuthProvider to keep it separate
export const useUserProfile = (userId: string | null) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();
      if (error) throw new Error("Failed to fetch user profile");
      return data;
    },
    enabled: !!userId,
  });
};
