import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";


const Signup = () => {
  const { signup, authLoading, authError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    try {
      await signup(email, password, name);
      setSuccess(true);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          {authLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {authError && <p className="error">{authError}</p>}
      {success && <p className="success">Signup successful! You can now log in.</p>}
    </div>
  );
};

export default Signup;

