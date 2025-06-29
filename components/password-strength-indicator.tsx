"use client"

import { useEffect, useState } from "react"

interface PasswordStrengthIndicatorProps {
  password: string
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const [strength, setStrength] = useState({
    score: 0,
    label: "Too weak",
    color: "bg-red-500",
  })

  useEffect(() => {
    // Calculate password strength
    const calculateStrength = (password: string) => {
      if (!password) {
        return {
          score: 0,
          label: "Too weak",
          color: "bg-red-500",
        }
      }

      let score = 0

      // Length check
      if (password.length >= 8) score += 1
      if (password.length >= 12) score += 1

      // Character variety checks
      if (/[A-Z]/.test(password)) score += 1 // Has uppercase
      if (/[a-z]/.test(password)) score += 1 // Has lowercase
      if (/[0-9]/.test(password)) score += 1 // Has number
      if (/[^A-Za-z0-9]/.test(password)) score += 1 // Has special char

      // Determine strength label and color
      let label = "Too weak"
      let color = "bg-red-500"

      if (score >= 6) {
        label = "Strong"
        color = "bg-green-500"
      } else if (score >= 4) {
        label = "Good"
        color = "bg-yellow-400"
      } else if (score >= 2) {
        label = "Fair"
        color = "bg-orange-500"
      }

      return {
        score: Math.min(score, 6), // Cap at 6
        label,
        color,
      }
    }

    setStrength(calculateStrength(password))
  }, [password])

  // Calculate width percentage based on score (max score is 6)
  const widthPercentage = (strength.score / 6) * 100

  return (
    <div className="mt-2 space-y-1">
      <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${strength.color} transition-all duration-300 ease-in-out`}
          style={{ width: `${widthPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center text-xs">
        <span
          className={`font-medium ${
            strength.color === "bg-red-500"
              ? "text-red-400"
              : strength.color === "bg-orange-500"
                ? "text-orange-400"
                : strength.color === "bg-yellow-400"
                  ? "text-yellow-400"
                  : "text-green-400"
          }`}
        >
          {strength.label}
        </span>
        <span className="text-gray-400">{strength.score < 4 && "Add more variety for a stronger password"}</span>
      </div>
    </div>
  )
}
