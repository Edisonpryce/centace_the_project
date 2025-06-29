"use client"

import type React from "react"
import { useEffect } from "react"
import { ErrorBoundary } from "@/components/error-boundary"

// Simple error provider that doesn't use context
export function ErrorProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Set up global error handlers
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled Promise Rejection:", event.reason)
    }

    const handleError = (event: ErrorEvent) => {
      console.error("Global Error:", event.error || event.message)
    }

    // Add event listeners
    window.addEventListener("unhandledrejection", handleUnhandledRejection)
    window.addEventListener("error", handleError)

    // Clean up
    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
      window.removeEventListener("error", handleError)
    }
  }, [])

  return <ErrorBoundary>{children}</ErrorBoundary>
}

// Export a dummy hook to satisfy any imports
export function useErrorContext() {
  return {
    captureError: (error: unknown) => {
      console.error("Error captured:", error)
    },
    lastError: null,
    clearLastError: () => {},
  }
}
