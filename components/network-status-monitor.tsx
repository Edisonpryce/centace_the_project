"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { WifiOff } from "lucide-react"
import { logInfo, logWarning } from "@/lib/services/error-logger"

interface NetworkStatusMonitorProps {
  children: React.ReactNode
}

export function NetworkStatusMonitor({ children }: NetworkStatusMonitorProps) {
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      logInfo("Network connection restored")
    }

    const handleOffline = () => {
      setIsOnline(false)
      logWarning("Network connection lost")
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!isOnline) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-50">
        <div className="bg-amber-500 text-white p-2 flex items-center justify-center">
          <WifiOff className="h-4 w-4 mr-2" />
          <span>You are currently offline. Some features may be unavailable.</span>
        </div>
        {children}
      </div>
    )
  }

  return <>{children}</>
}
