"use client"

import { Eye, EyeOff, Key, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface SecurityTabProps {
  themeStyles: Record<string, string>
  theme: string
}

export function SecurityTab({ themeStyles, theme }: SecurityTabProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)

  return (
    <div className="space-y-6">
      <div
        className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border}`}
      >
        <h2 className="text-xl font-bold mb-6">Password</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.text} pr-10`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.text} pr-10`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className={`${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.text}`}
              />
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium mt-2">
              <Key className="h-4 w-4 mr-2" />
              Update Password
            </Button>
          </div>

          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-[#21262d]" : "bg-gray-50"}`}>
            <h3 className="text-lg font-medium mb-3">Password Requirements</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                <span>Minimum 8 characters</span>
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                <span>At least one uppercase letter</span>
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                <span>At least one number</span>
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                <span>At least one special character</span>
              </li>
            </ul>

            <div className="mt-4 p-3 bg-yellow-900/30 text-yellow-400 rounded-lg text-sm flex items-start">
              <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>For security reasons, you should use a password that you don't use elsewhere.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
