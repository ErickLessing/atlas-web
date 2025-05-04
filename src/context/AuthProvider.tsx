import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
  authLoading: boolean;
  authError: string | null;
  setAuthError: (error: string | null) => void;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const signup = async (username: string, password: string) => {
    try {
      setAuthLoading(true);
      setAuthError(null);
      const { data } = await api.post("/auth/register", { username, password });
      console.log(data);
      localStorage.setItem("jwtToken", data.token);
      queryClient.fetchQuery({ queryKey: ["user"] });
    } catch (error: any) {
      setAuthError(error.response?.data || "Signup failed");
      setAuthLoading(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      setAuthLoading(true);
      setAuthError(null);
      const response = await api.post("/auth/login", { username, password });

      localStorage.setItem("jwtToken", response.data.token);
      queryClient.fetchQuery({ queryKey: ["user"] });
    } catch (error: any) {
      setAuthError(error.response?.data || "Login failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("jwtToken");
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  useEffect(() => {
    if (authError) console.error(authError);
  }, [authError]);

  return (
    <AuthContext.Provider
      value={{
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
