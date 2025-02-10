import { useState } from "react";
import { account } from "../../lib/appwrite";
import { useRouter } from "next/router";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailSession(email, password);
      const user = await account.get();
      if (user.emailVerification) {
        router.push("/dashboard"); // Redirect to dashboard if verified
      } else {
        router.push("/auth/verify-pending"); // Redirect to verification pending page if not verified
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
        required
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Log In
      </button>
      <p className="mt-4 text-gray-400">
        Don't have an account?{" "}
        <a href="/auth/register" className="text-blue-500 hover:underline">
          Register
        </a>
      </p>
    </form>
  );
}