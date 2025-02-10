import { useState } from "react";
import { account } from "../../lib/appwrite";
import { useRouter } from "next/router";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await account.create("unique()", email, password, name);
      alert("Registration successful! Check your email for verification.");
      router.push("/auth/verify-pending"); // Redirect to verification pending page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
        required
      />
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
        Sign Up
      </button>
      <p className="mt-4 text-gray-400">
        Already have an account?{" "}
        <a href="/auth/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </form>
  );
}