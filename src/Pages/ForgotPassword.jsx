import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSendLink = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email, {
        url: "https://talesoftheday.vercel.app/reset-password",
      });
      toast.success("A reset link has been sent. Check your inbox.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-200 flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Forgot Your Password?</h1>
        <p className="text-center text-gray-600 text-sm italic mb-6">
          Even the best storytellers lose their keys. Let us send you a new one.
        </p>

        <form onSubmit={handleSendLink} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold tracking-wide"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
