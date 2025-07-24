"use client"

import { useState, useEffect } from "react"
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth"
import { auth } from "../utils/firebaseConfig"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Lock, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react'
import ThemeToggle from "../Components/ThemeToggle"

const ResetPassword = () => {
  const [oobCode, setOobCode] = useState(null)
  const [newPassword, setNewPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get("oobCode")
    if (code) setOobCode(code)
    else toast.error("Invalid or missing reset code.")
  }, [])

  // Password strength checker
  useEffect(() => {
    let strength = 0
    if (newPassword.length >= 8) strength++
    if (/[A-Z]/.test(newPassword)) strength++
    if (/[a-z]/.test(newPassword)) strength++
    if (/[0-9]/.test(newPassword)) strength++
    if (/[^A-Za-z0-9]/.test(newPassword)) strength++
    setPasswordStrength(strength)
  }, [newPassword])

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500 dark:bg-red-400"
    if (passwordStrength <= 3) return "bg-yellow-500 dark:bg-yellow-400"
    return "bg-green-500 dark:bg-green-400"
  }

  const getStrengthText = () => {
    if (passwordStrength <= 2) return "Weak"
    if (passwordStrength <= 3) return "Medium"
    return "Strong"
  }

  const handleReset = async (e) => {
    e.preventDefault()
    if (!newPassword || !oobCode) return toast.error("Please fill the field.")

    setIsLoading(true)
    try {
      await verifyPasswordResetCode(auth, oobCode)
      await confirmPasswordReset(auth, oobCode, newPassword)
      toast.success("Password reset successfully!")
      navigate("/login")
    } catch (error) {
      toast.error("Failed to reset. The link may have expired.")
    } finally {
      setIsLoading(false)
    }
  }

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
              <div className="w-16 h-16 bg-green-100 dark:bg-gray-900 rounded-full flex items-center justify-center transition-colors duration-300">
                <Lock className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                Reset Your Password
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                Set a strong new password for your account.
              </p>
            </div>

            <form onSubmit={handleReset} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-200 placeholder-black dark:placeholder-white"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password strength indicator */}
                {newPassword && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        Password strength:
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength <= 2
                            ? "text-red-600 dark:text-red-400"
                            : passwordStrength <= 3
                              ? "text-yellow-600 dark:text-yellow-400"
                              : "text-green-600 dark:text-green-400"
                        } transition-colors duration-300`}
                      >
                        {getStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 transition-colors duration-300">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Password requirements */}
                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  <div
                    className={`flex items-center space-x-2 ${newPassword.length >= 8 ? "text-green-600 dark:text-green-400" : ""} transition-colors`}
                  >
                    <CheckCircle
                      className={`w-3 h-3 ${newPassword.length >= 8 ? "text-green-600 dark:text-green-400" : "text-gray-300 dark:text-gray-700"} transition-colors`}
                    />
                    <span>At least 8 characters</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 ${/[A-Z]/.test(newPassword) ? "text-green-600 dark:text-green-400" : ""} transition-colors`}
                  >
                    <CheckCircle
                      className={`w-3 h-3 ${/[A-Z]/.test(newPassword) ? "text-green-600 dark:text-green-400" : "text-gray-300 dark:text-gray-700"} transition-colors`}
                    />
                    <span>One uppercase letter</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 ${/[0-9]/.test(newPassword) ? "text-green-600 dark:text-green-400" : ""} transition-colors`}
                  >
                    <CheckCircle
                      className={`w-3 h-3 ${/[0-9]/.test(newPassword) ? "text-green-600 dark:text-green-400" : "text-gray-300 dark:text-gray-700"} transition-colors`}
                    />
                    <span>One number</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !newPassword || !oobCode || passwordStrength < 3}
                className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Resetting...</span>
                  </>
                ) : (
                  <span>Reset Password</span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                Remember your password?{" "}
                <a
                  href="/login"
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>

          {/* Footer text */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6 transition-colors duration-300">
            🔒 Your password is encrypted and secure. We recommend using a unique password you haven't used elsewhere.
          </p>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
