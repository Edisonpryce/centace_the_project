"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"

interface InactivityLogoutOptions {
  inactivityTimeout: number // in milliseconds
  warningTime: number // in milliseconds
  onLogout: () => Promise<void>
  onWarning?: () => void
  onActivity?: () => void
  enabled?: boolean
}

export function useInactivityLogout({
  inactivityTimeout = 30 * 60 * 1000, // 30 minutes by default
  warningTime = 5 * 60 * 1000, // 5 minutes warning before logout
  onLogout,
  onWarning,
  onActivity,
  enabled = true,
}: InactivityLogoutOptions) {
  const [showWarning, setShowWarning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(inactivityTimeout)
  const [isActive, setIsActive] = useState(true)
  const router = useRouter()

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null)
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastActivityRef = useRef<number>(Date.now())

  // Reset timers and update last activity time
  const resetTimers = useCallback(() => {
    if (!enabled) return

    // Clear existing timers
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current)
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current)
    }

    // Update last activity time
    lastActivityRef.current = Date.now()

    // Reset warning state
    setShowWarning(false)
    setTimeRemaining(inactivityTimeout)
    setIsActive(true)

    // Set new timers
    warningTimerRef.current = setTimeout(() => {
      setShowWarning(true)
      onWarning?.()

      // Start countdown timer
      countdownIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - lastActivityRef.current
        const remaining = Math.max(0, inactivityTimeout - elapsed)
        setTimeRemaining(remaining)

        if (remaining <= 0) {
          // Time's up, clear interval
          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current)
          }
        }
      }, 1000)
    }, inactivityTimeout - warningTime)

    inactivityTimerRef.current = setTimeout(async () => {
      setIsActive(false)
      await onLogout()
    }, inactivityTimeout)

    // Call onActivity callback if provided
    onActivity?.()
  }, [enabled, inactivityTimeout, warningTime, onLogout, onWarning, onActivity])

  // Handle user activity
  const handleActivity = useCallback(() => {
    resetTimers()
  }, [resetTimers])

  // Set up event listeners for user activity
  useEffect(() => {
    if (!enabled) return

    // Initialize timers
    resetTimers()

    // Set up event listeners for user activity
    const activityEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click", "keydown"]

    const activityHandler = () => {
      handleActivity()
    }

    activityEvents.forEach((event) => {
      window.addEventListener(event, activityHandler, { passive: true })
    })

    // Clean up event listeners and timers
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, activityHandler)
      })

      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
      if (warningTimerRef.current) {
        clearTimeout(warningTimerRef.current)
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current)
      }
    }
  }, [enabled, resetTimers, handleActivity])

  // Format the remaining time for display
  const formatTimeRemaining = () => {
    const minutes = Math.floor(timeRemaining / 60000)
    const seconds = Math.floor((timeRemaining % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Extend the session
  const extendSession = useCallback(() => {
    resetTimers()
  }, [resetTimers])

  return {
    showWarning,
    timeRemaining,
    formatTimeRemaining,
    extendSession,
    isActive,
  }
}
