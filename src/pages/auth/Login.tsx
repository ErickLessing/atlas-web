import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../context/AuthProvider";

const Login = () => {
  const { login, authLoading, authError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate({ to: "/" }); // Redirect to Dashboard
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={authLoading}>
          {authLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {authError && <p className="error">{authError}</p>}
    </div>
  );
};

export default Login;
