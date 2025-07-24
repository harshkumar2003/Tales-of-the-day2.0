import { useState } from "react";
import { Link } from "react-router-dom";
import Login_Singuppage from "../Components/Login_Singuppage";
import { useNavigate } from "react-router-dom";
import InputForm from "../Components/InputForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebaseConfig";
import toast, { Toaster } from "react-hot-toast";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";
import ThemeToggle from "../Components/ThemeToggle";

const Login = () => {
  const reqinput = [
    { label: "Email", type: "email", name: "email" },
    { label: "Password", type: "password", name: "password" },
  ];

  const reqhead = [
    {
      heading: "Begin Your Journey",
      sub: "Every moment deserves a voice.",
    },
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      var userId;
      if (userDoc.exists()) {
        userId = user.uid;
      }
      // alert();
      toast.success("Signed in successfully!", {
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
      // console.error("Login error:", error);
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
                <LogIn className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                Welcome to Your Story
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                Ink your thoughts, one tale at a time.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-black dark:placeholder-white"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={onChange}
                    disabled={isLoading}
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-black dark:placeholder-white"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={onChange}
                    disabled={isLoading}
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={isLoading || !formData.email || !formData.password}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          {/* Footer text */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6 transition-colors duration-300">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
