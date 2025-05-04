import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../context/AuthProvider";

const Login = () => {
  const { login, authLoading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(username, password);
      navigate({ to: "/dashboard" }); // Redirect to Dashboard
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="w-full shadow-xl flex flex-col items-center p-8 border rounded-md">
      <h2>Login</h2>
      <div>*****</div>
      <form
        className="w-full flex flex-col items-left mt-4"
        onSubmit={handleLogin}
      >
        <label>Email</label>
        <input
          className="py-1 px-2 border border-gray-300 rounded-md mb-4 text-sm"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          className="py-1 px-2 border border-gray-300 rounded-md mb-4 text-sm"
          value={password}
          placeholder="*******"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="bg-black text-white px-4 py-2 mt-4 rounded-md"
          type="submit"
          disabled={authLoading}
        >
          {authLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
