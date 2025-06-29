"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        throw error
      }

      setSuccess(true)
    } catch (error: any) {
      console.error("Password reset error:", error)
      setError(error.message || "Failed to send password reset email. Please try again.")
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
          <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
          <p className="text-gray-400">Enter your email to receive a password reset link</p>
        </div>

        <div className="bg-gray-50 dark:bg-[#161b22] rounded-lg p-8 shadow-lg">
          {success ? (
            <div className="text-center">
              <div className="p-3 bg-green-900/30 border border-green-800 rounded-md text-green-400 text-sm mb-6">
                Password reset email sent! Please check your inbox and follow the instructions.
              </div>
              <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-medium">
                Return to login
              </Link>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="p-3 bg-red-900/30 border border-red-800 rounded-md text-red-400 text-sm">{error}</div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="bg-white dark:bg-[#0d1117] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>

              <div className="text-center mt-4">
                <Link href="/login" className="text-sm text-gray-400 hover:text-gray-300">
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>

        <div className="mt-8">
          <div className="bg-[#161b22] rounded-lg p-6">
            <h3 className="text-sm font-medium mb-3">Password Reset Information</h3>
            <ul className="text-xs text-gray-400 space-y-2">
              <li>• You will receive an email with a password reset link</li>
              <li>• The link will expire after 24 hours</li>
              <li>• Make sure to check your spam folder if you don't see the email</li>
              <li>• Contact support if you need further assistance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
