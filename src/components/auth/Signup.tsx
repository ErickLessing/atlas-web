import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";

type SignupProps = {
  success: boolean;
  setSuccess: (success: boolean) => void;
};

const Signup = ({ success, setSuccess }: SignupProps) => {
  const { signup, authLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    try {
      await signup(username, password);
      setSuccess(true);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="w-full shadow-xl flex flex-col items-center p-8 border rounded-md">
      <h2>Sign Up</h2>
      <form
        className="w-full flex flex-col items-left mt-4"
        onSubmit={handleSignup}
      >
        <label>username</label>
        <input
          type="text"
          className="py-1 px-2 border border-gray-300 rounded-md mb-4 text-sm"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>password</label>
        <input
          type="password"
          className="px-1 border border-gray-300 rounded-md mb-4"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={authLoading}
          className="bg-black text-white px-4 py-2 mt-4 rounded-md"
        >
          {authLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {success && (
        <p className="success">Signup successful! You can now log in.</p>
      )}
    </div>
  );
};

export default Signup;
