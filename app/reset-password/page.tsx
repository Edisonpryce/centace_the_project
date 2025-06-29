"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageCurrencyDropdown } from "@/components/language-currency-dropdown"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { PasswordStrengthIndicator } from "@/components/password-strength-indicator"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const supabase = createClientComponentClient()

  // Check if we have a hash in the URL (from the password reset email)
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    if (!hashParams.get("access_token")) {
      setError("Invalid or expired password reset link. Please request a new one.")
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({ password })

      if (error) {
        throw error
      }

      setSuccess(true)
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error: any) {
      console.error("Password update error:", error)
      setError(error.message || "Failed to update password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-cyan-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            C
          </div>
          <h1 className="text-3xl font-bold mb-2">Create New Password</h1>
          <p className="text-gray-400">Enter your new password below</p>
        </div>

        <div className="bg-gray-50 dark:bg-[#161b22] rounded-lg p-8 shadow-lg">
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <ThemeToggle />
            <LanguageCurrencyDropdown isDark={true} />
          </div>

          {success ? (
            <div className="text-center">
              <div className="p-3 bg-green-900/30 border border-green-800 rounded-md text-green-400 text-sm mb-6">
                Password updated successfully! Redirecting to login...
              </div>
              <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-medium">
                Go to login now
              </Link>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="p-3 bg-red-900/30 border border-red-800 rounded-md text-red-400 text-sm">{error}</div>
              )}

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-white dark:bg-[#0d1117] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <PasswordStrengthIndicator password={password} />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-white dark:bg-[#0d1117] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white pr-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          )}
        </div>

        <div className="mt-8">
          <div className="bg-[#161b22] rounded-lg p-6">
            <h3 className="text-sm font-medium mb-3">Password Security Tips</h3>
            <ul className="text-xs text-gray-400 space-y-2">
              <li>• Use at least 8 characters</li>
              <li>• Include uppercase and lowercase letters</li>
              <li>• Add numbers and special characters</li>
              <li>• Avoid using easily guessable information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
