"use client"

import { useEffect, useState } from "react"
import { APP_CONFIG } from "@/lib/config/env-config"

// This component initializes environment variables on the client side
// when they're not available from the server
export function EnvInitializer() {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Only run once
    if (initialized) return

    // Set environment variables in window object for client access
    if (typeof window !== "undefined") {
      window.__ENV__ = window.__ENV__ || {}
      window.__ENV__.NEXT_PUBLIC_APP_VERSION = APP_CONFIG.version
      window.__ENV__.NEXT_PUBLIC_APP_URL = APP_CONFIG.url
      window.__ENV__.NEXT_PUBLIC_ERROR_LOGGING_ENDPOINT = APP_CONFIG.errorLoggingEndpoint
    }

    setInitialized(true)
  }, [initialized])

  // This component doesn't render anything
  return null
}

// Add this to the global Window interface
declare global {
  interface Window {
    __ENV__: {
      [key: string]: string
    }
  }
}
