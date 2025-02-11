import { useEffect } from "react";
import { useRouter } from "next/router";
import { account } from "../../lib/appwrite";

export default function Verify() {
  const router = useRouter();
  const { userId, secret } = router.query;

  useEffect(() => {
    const verifyEmail = async () => {
      if (userId && secret) {
        try {
          await account.updateVerification(userId, secret);
          alert("Email verified successfully! You can now log in.");
          router.push("/auth/login");
        } catch (error) {
          alert("Verification failed. Please try again.");
        }
      }
    };

    verifyEmail();
  }, [userId, secret]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Verifying Your Email...</h1>
    </div>
  );
}