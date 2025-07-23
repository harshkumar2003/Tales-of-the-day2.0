

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
      toast.error("Invalid reset link.");
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
      toast.success("Password has been reset. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error("Reset failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-indigo-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Reset Your Password</h2>

        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New Password"
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
