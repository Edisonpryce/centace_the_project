"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Moon, Globe, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col">
      {/* Navigation Bar */}
      <header className="border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold mr-2">
              C
            </div>
            <span className="font-medium">Centace</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="#" className="text-sm text-gray-300 hover:text-white">
              Project Discovery
            </Link>
            <Link href="#" className="text-sm text-gray-300 hover:text-white">
              Portfolio Tracking
            </Link>
            <Link href="#" className="text-sm text-gray-300 hover:text-white">
              Returns Distribution
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input className="w-64 bg-[#161b22] border-gray-700 pl-8 text-sm rounded-md" placeholder="Search..." />
          </div>
          <Button variant="ghost" size="sm" className="text-gray-300">
            Login
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300">
            <Globe className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300">
            <Moon className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-[#161b22] rounded-lg p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
              <p className="text-gray-400 text-sm">Join Centace and start investing in real-world projects</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <Input id="firstName" placeholder="John" className="bg-[#0d1117] border-gray-700 text-white" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Doe" className="bg-[#0d1117] border-gray-700 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="bg-[#0d1117] border-gray-700 text-white"
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
                    className="bg-[#0d1117] border-gray-700 text-white pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Password must be at least 8 characters with a number and a special character
                </p>
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
                    className="bg-[#0d1117] border-gray-700 text-white pr-10"
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

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  className="mt-1 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                />
                <label htmlFor="terms" className="text-xs text-gray-400">
                  I agree to the{" "}
                  <Link href="#" className="text-yellow-400 hover:text-yellow-300">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-yellow-400 hover:text-yellow-300">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                Create Account
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#161b22] px-2 text-gray-400">Or sign up with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="bg-[#0d1117] border-gray-700 hover:bg-gray-800 text-white">
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
                <Button variant="outline" className="bg-[#0d1117] border-gray-700 hover:bg-gray-800 text-white">
                  <div className="w-5 h-5 mr-2">
                    <svg viewBox="0 0 24 24" className="w-full h-full">
                      <path
                        fill="white"
                        d="M17.05 20.28c-.98.95-2.05.86-3.12.38-1.12-.5-2.12-.48-3.3 0-1.58.64-2.4.46-3.33-.42-2.57-2.45-2.8-7.18-.51-10.42 1.55-2.2 4.34-2.25 5.27.17.93-2.45 3.8-2.36 5.27.17 1.55 2.66.83 6.54-1.28 8.87l.01 1.25zm-.35-10.58c-.83-.11-1.56.25-2.15.9-.52.57-1 .56-1.48 0-.58-.67-1.35-1.04-2.18-.92-.92.13-1.62.77-1.95 1.73-.42 1.24-.42 2.5.03 3.72.35.95 1 1.6 1.9 1.92.64.23 1.22.12 1.75-.29.35-.27.7-.27 1.05-.01.54.4 1.12.5 1.75.27.94-.35 1.54-1.06 1.87-2.1.06-.17.07-.38.11-.58-.95-.5-1.42-1.35-1.4-2.4.03-1.05.53-1.87 1.7-2.24z"
                      />
                    </svg>
                  </div>
                  Apple
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link href="#" className="text-yellow-400 hover:text-yellow-300 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-[#161b22] rounded-lg p-6">
              <h3 className="text-sm font-medium mb-3">Why Join Centace?</h3>
              <ul className="text-xs text-gray-400 space-y-2">
                <li>• Access to exclusive investment opportunities in real-world projects</li>
                <li>• Track your investments and monitor returns in real-time</li>
                <li>• Connect with project owners and other investors</li>
                <li>• Receive personalized investment recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0d1117] text-white pt-12 pb-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Connect */}
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <div className="grid grid-cols-3 gap-4">
                <a href="#" className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* About Us */}
            <div>
              <h3 className="font-bold mb-4">About Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>

            {/* Service */}
            <div>
              <h3 className="font-bold mb-4">Service</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Cloudfunding
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Sole funding
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Business planning
                  </a>
                </li>
              </ul>
            </div>

            {/* Learn */}
            <div>
              <h3 className="font-bold mb-4">Learn</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Navigation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Project Funding
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Maturity periods
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    24/7 Chat Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-400">Centace@ 2025</p>
              </div>
              <div>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  Terms and Conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
