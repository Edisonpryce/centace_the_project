"use client"

import { useEffect } from "react"
import { ErrorDisplay } from "@/components/ui/error-display"
import { logError } from "@/lib/services/error-logger"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to our reporting service
    logError(error, { source: "app/error.tsx", digest: error.digest })
  }, [error])

  return (
    <ErrorDisplay
      title="Something went wrong!"
      description="We apologize for the inconvenience. Our team has been notified of this issue."
      error={error}
      showErrorDetails={process.env.NODE_ENV === "development"}
      onRetry={reset}
      variant="fullpage"
      severity="error"
    />
  )
}
