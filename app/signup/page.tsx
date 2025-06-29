"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/context/auth-context"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PasswordStrengthIndicator } from "@/components/password-strength-indicator"
import dynamic from "next/dynamic"

// Lazy load the terms dialog content
const TermsDialogContent = dynamic(() => import("@/components/terms-dialog-content"), {
  loading: () => (
    <div className="p-8 flex justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ),
  ssr: false,
})

export default function SignupPage() {
  const router = useRouter()
  const { user, signIn } = useAuth()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [termsDialogOpen, setTermsDialogOpen] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [termsOfServiceOpen, setTermsOfServiceOpen] = useState(false)
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  // Mark page as loaded after initial render
  useEffect(() => {
    setIsPageLoaded(true)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!acceptTerms) {
      setError("You must accept the terms and conditions")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)

    try {
      // Since we don't have a signUp function in the auth context, we'll use signIn
      // In a real app, you would implement a proper signUp function
      await signIn(email, password)
      setSignupSuccess(true)
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (error) {
      console.error("Signup error:", error)
      setError(error?.message || "Error creating account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTermsChange = (checked) => {
    if (checked === true) {
      setTermsDialogOpen(true)
    } else {
      setAcceptTerms(false)
    }
  }

  const handleTermsAgree = () => {
    setAcceptTerms(true)
    setTermsDialogOpen(false)
  }

  const handleTermsCancel = () => {
    setAcceptTerms(false)
    setTermsDialogOpen(false)
  }

  const handleBackToHome = (e) => {
    e.preventDefault()
    router.push("/")
  }

  return (
    <div
      className={`min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white flex flex-col items-center justify-center px-4 py-12 transition-opacity duration-300 ${
        isPageLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="w-16 h-16 rounded-full bg-cyan-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 hover:bg-cyan-700 transition-colors">
              C
            </div>
          </Link>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Create an Account</h1>
          </div>
          <p className="text-gray-400">Join Centace to start your investment journey</p>
        </div>

        <div className="bg-gray-50 dark:bg-[#161b22] rounded-lg p-8 shadow-lg">
          {signupSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                ✓
              </div>
              <h2 className="text-xl font-bold mb-2">Account Created Successfully!</h2>
              <p className="text-gray-400 mb-6">Redirecting you to the dashboard...</p>
              <Button
                onClick={() => router.push("/dashboard")}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium"
              >
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <form className="space-y-6 relative" onSubmit={handleSubmit}>
              {error && (
                <div className="p-3 bg-red-900/30 border border-red-800 rounded-md text-red-400 text-sm">{error}</div>
              )}

              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  className="bg-white dark:bg-[#0d1117] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

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

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
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
                <p className="text-xs text-gray-400 mt-1">Password must be at least 8 characters</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
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

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={handleTermsChange}
                  className="mt-1 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                />
                <label htmlFor="terms" className="text-xs text-gray-400">
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setTermsOfServiceOpen(true)}
                    className="text-cyan-500 hover:text-cyan-400 underline"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <Link href="#" className="text-cyan-500 hover:text-cyan-400">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-50 dark:bg-[#161b22] px-2 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="bg-white dark:bg-[#0d1117] border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <div className="w-5 h-5 mr-2">
                    <svg viewBox="0 0 24 24" className="w-full h-full">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </div>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="bg-white dark:bg-[#0d1117] border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <div className="flex items-center justify-center w-5 h-5 mr-2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </div>
                  Apple
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-cyan-500 hover:text-cyan-400 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="mt-4 text-center">
                <button onClick={handleBackToHome} className="text-sm text-gray-400 hover:text-gray-300">
                  ← Back to home
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Terms Dialog */}
      {termsDialogOpen && (
        <Dialog open={termsDialogOpen} onOpenChange={setTermsDialogOpen}>
          <DialogContent className="bg-[#161b22] border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Confirm Agreement</DialogTitle>
              <DialogDescription className="text-gray-400">
                Please confirm that you have read and agree to our Terms of Service and Privacy Policy.
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[200px] overflow-y-auto my-4 text-sm text-gray-300 border border-gray-700 rounded-md p-3 bg-[#0d1117]">
              By clicking "I Agree", you confirm that you have read, understood, and accept our Terms of Service and
              Privacy Policy. These documents outline your rights and responsibilities as a user of our platform.
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={handleTermsCancel}
                className="bg-transparent border-gray-700 hover:bg-gray-800 text-white"
              >
                Cancel
              </Button>
              <Button onClick={handleTermsAgree} className="bg-cyan-600 hover:bg-cyan-700 text-white">
                I Agree
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Terms of Service Dialog */}
      {termsOfServiceOpen && (
        <Dialog open={termsOfServiceOpen} onOpenChange={setTermsOfServiceOpen}>
          <DialogContent className="bg-[#161b22] border-gray-700 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
            <Suspense
              fallback={
                <div className="p-8 flex justify-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              }
            >
              <TermsDialogContent onClose={() => setTermsOfServiceOpen(false)} />
            </Suspense>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
