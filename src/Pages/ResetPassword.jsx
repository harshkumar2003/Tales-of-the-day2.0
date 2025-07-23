import { useEffect, useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [oobCode, setOobCode] = useState(null);

  useEffect(() => {
    const code = params.get("oobCode");
    if (!code) {
      toast.error("Invalid or expired link.");
      navigate("/");
    } else {
      setOobCode(code);
    }
  }, [params, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      toast.success("Password reset successful. You may now login.");
      navigate("/login");
    } catch (err) {
      toast.error("Password reset failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-indigo-100 to-purple-200 flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur shadow-2xl rounded-2xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Reset Your Password</h1>
        <p className="text-center text-sm text-gray-600 mb-6 italic">
          Begin a new chapter. Enter your new password below.
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
