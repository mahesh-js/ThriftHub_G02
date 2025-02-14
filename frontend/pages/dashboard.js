import { useEffect } from "react";
import { useRouter } from "next/router";
import { account } from "../lib/appwrite";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await account.get();
        if (!user) {
          router.push("/auth/login"); // Redirect to login if not authenticated
        }
      } catch (error) {
        router.push("/auth/login"); // Redirect to login if error
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to Your Dashboard</h1>
      <p className="text-lg text-gray-400">You are now logged in and can access your account details.</p>
      <button
        onClick={async () => {
          await account.deleteSession("current");
          router.push("/auth/login"); // Log out and redirect to login
        }}
        className="mt-4 p-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Log Out
      </button>
    </div>
  );
}