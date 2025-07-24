import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebaseConfig";
import { Link } from "react-router-dom";
import Login_Singuppage from "../Components/Login_Singuppage";
import InputForm from "../Components/InputForm";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { UserPlus, Loader2 } from 'lucide-react';
import ThemeToggle from "../Components/ThemeToggle";

const Signup = () => {
  const reqinput = [
    { label: "Full Name", type: "text", name: "fullName" },
    { label: "Email", type: "email", name: "email" },
    { label: "Password", type: "password", name: "password" },
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    const { fullName, email, password } = formData;
    
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        createdAt: new Date(),
      });
      toast.success("Account created successfully!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Something went wrong!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <>
    <div className="pt-2 flex justify-end pr-4">
      <ThemeToggle />
    </div>
    
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        {/* Main card */}
        <div className="bg-white dark:bg-black rounded-2xl shadow-xl border border-gray-100 dark:border-gray-900 p-8 transition-colors duration-300">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-gray-900 rounded-full flex items-center justify-center transition-colors duration-300">
              <UserPlus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              Begin Your Journey
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
              Every moment deserves a voice.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }} className="space-y-6">
            {reqinput.map((item, index) => (
              <div key={`input-${index}`} className="space-y-2">
                <label
                  htmlFor={item.name}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300"
                >
                  {item.label}
                </label>
                <input
                  id={item.name}
                  name={item.name}
                  type={item.type}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-black dark:placeholder-white"
                  placeholder={`Enter your ${item.label.toLowerCase()}`}
                  value={formData[item.name]}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoading || !formData.fullName || !formData.email || !formData.password}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6 transition-colors duration-300">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  </>
);
};

export default Signup;
