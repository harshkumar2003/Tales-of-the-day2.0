
import { useState } from "react"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../utils/firebaseConfig" // adjust path if needed
import { toast } from "react-hot-toast"
import { Mail, ArrowLeft, Loader2 } from "lucide-react"
import ThemeToggle from "../Components/ThemeToggle"
import { Link } from "react-router-dom"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleResetLink = async (e) => {
    e.preventDefault()
    if (!email) return toast.error("Please enter your email.")

    setIsLoading(true)
    try {
      await sendPasswordResetEmail(auth, email, {
        url: "https://talesoftheday.vercel.app/reset-password", // change in production
        handleCodeInApp: true,
      })
      toast.success("Reset link sent to your email.")
      setEmail("")
    } catch (error) {
      toast.error("Error sending reset email. Try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
        <div className="pt-2 flex justify-end pr-4">
        <ThemeToggle />
      </div>

          <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-4 transition-colors duration-300">
      
      <div className="w-full max-w-md">
        {/* Back button */}
        <Link to="/login">
            <button className="cursor-pointer flex items-center text-black dark:text-white hover:text-gray-900 dark:hover:text-gray-200 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to login
        </button>

        </Link>

        {/* Main card */}
        <div className="bg-white dark:bg-black rounded-2xl shadow-xl border border-gray-100 dark:border-gray-900 p-8 transition-colors duration-300">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-gray-900 rounded-full flex items-center justify-center transition-colors duration-300">
              <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              Forgot Password?
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
              We'll send a link to help you reset it.
            </p>
          </div>

          <form onSubmit={handleResetLink} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-black dark:placeholder-white"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
            </div>

            <button
              type="submit"
              
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              Remember your password?{" "}
              <a
                href="/login"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6 transition-colors duration-300">
          Check your spam folder if you don't receive the email within a few minutes.
        </p>
      </div>
    </div>
    </>

  )
}

export default ForgotPassword
