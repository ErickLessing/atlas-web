import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import { colors } from "@/styles/pallet";

export const AuthPage = () => {
  const { login, signup, authError, authLoading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const handleAuth = async () => {
    if (isSignUp) await signup(username, password);
    else await login(username, password);

    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return (
    <div
      style={{
        backgroundColor: colors.background,
      }}
    className="flex flex-col items-center justify-center h-[420px] w-[360px] border border-[#0000001a] p-6 px-8 rounded shadow-xl gap-9">
      {/* Header (1/3 of the height) */}
      <h1 className="text-2xl w-full text-center">
        {isSignUp ? "Sign Up" : "Login"}
      </h1>

      {/* Inputs (1/3 of the height) */}
      <div className="gap-4 w-full flex flex-col">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`border border-[#0000001a] p-2 w-full rounded placeholder:text-[${colors.border}]`}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`border border-[#0000001a] p-2 w-full rounded placeholder:text-[${colors.border}]`}
        />
      </div>

      {/* Button + Error Space (1/3 of the height) */}
      <div className="flex flex-col justify-center items-center w-full gap-4 ">
        {/* Fixed Height for Errors (Prevents Jumping) */}
        <div className="h-[24px] text-red-500 text-sm text-center mb-6">
          {authError && <span>{authError}</span>}
        </div>

        <button
          onClick={handleAuth}
          disabled={authLoading}
          className={`p-2 rounded w-full text-white flex justify-center items-center gap-2 ${
            authLoading ? "bg-gray-700 cursor-not-allowed" : "bg-gray-900"
          }`}
        >
          {authLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : isSignUp ? (
            "Sign Up"
          ) : (
            "Login"
          )}
        </button>
      </div>

      {/* Toggle Login/Signup Link */}
      <div className="absolute bottom-4 text-center w-full">
        <span>
          {isSignUp ? "Already have an account?" : "Need an account?"}
        </span>{" "}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className={`text-[${colors.accentBackground}] cursor-pointer`}
        >
          <span className="p-1 border-b-[1px]">
            {isSignUp ? "Login " : "Sign up "}
          </span>
        </button>
      </div>
    </div>
  );
};
