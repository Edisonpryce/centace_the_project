"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ErrorBoundary } from "@/components/error-boundary"
import { logError, logWarning, logInfo } from "@/lib/services/error-logger"
import { AppError } from "@/lib/services/error-logger"

function ErrorThrower() {
  const [shouldThrow, setShouldThrow] = useState(false)

  if (shouldThrow) {
    throw new Error("This is a test error from ErrorThrower component")
  }

  return (
    <div className="p-4 border rounded-md">
      <h3 className="font-medium mb-2">Component Error Test</h3>
      <Button onClick={() => setShouldThrow(true)}>Throw Error</Button>
    </div>
  )
}

export default function TestErrorPage() {
  const triggerUnhandledPromiseRejection = () => {
    // This will cause an unhandled promise rejection
    Promise.reject(new Error("This is an unhandled promise rejection test"))
  }

  const triggerConsoleError = () => {
    console.error(new Error("This is a console.error test"))
  }

  const triggerLogError = () => {
    logError(new Error("This is a manual error log test"), {
      userId: "test-user",
      action: "test-action",
    })
  }

  const triggerCustomError = () => {
    logError(
      new AppError("This is a custom app error", {
        code: "TEST_ERROR",
        severity: "medium",
        context: {
          testId: "123",
          testName: "Custom Error Test",
        },
      }),
    )
  }

  const triggerWarning = () => {
    logWarning("This is a test warning", {
      component: "TestErrorPage",
    })
  }

  const triggerInfo = () => {
    logInfo("This is a test info message", {
      component: "TestErrorPage",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Error Handling Test Page</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        This page allows you to test various error handling mechanisms. Check your console and the error logs endpoint
        for results.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Error Boundary Test</h2>
          <ErrorBoundary>
            <ErrorThrower />
          </ErrorBoundary>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Global Error Handler Tests</h2>

          <div className="p-4 border rounded-md space-y-4">
            <div>
              <h3 className="font-medium mb-2">Unhandled Promise Rejection</h3>
              <Button onClick={triggerUnhandledPromiseRejection} variant="destructive">
                Trigger Unhandled Promise Rejection
              </Button>
            </div>

            <div>
              <h3 className="font-medium mb-2">Console Error</h3>
              <Button onClick={triggerConsoleError} variant="destructive">
                Trigger Console Error
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Manual Logging Tests</h2>

          <div className="p-4 border rounded-md grid gap-4 grid-cols-1 md:grid-cols-3">
            <div>
              <h3 className="font-medium mb-2">Error Logger</h3>
              <Button onClick={triggerLogError} variant="outline" className="w-full">
                Log Error
              </Button>
            </div>

            <div>
              <h3 className="font-medium mb-2">Custom App Error</h3>
              <Button onClick={triggerCustomError} variant="outline" className="w-full">
                Log Custom Error
              </Button>
            </div>

            <div>
              <h3 className="font-medium mb-2">Warning & Info</h3>
              <div className="space-y-2">
                <Button onClick={triggerWarning} variant="outline" className="w-full">
                  Log Warning
                </Button>
                <Button onClick={triggerInfo} variant="outline" className="w-full">
                  Log Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <ul className="space-y-1">
            <li>
              <strong>NEXT_PUBLIC_APP_VERSION:</strong> {process.env.NEXT_PUBLIC_APP_VERSION || "Not set"}
            </li>
            <li>
              <strong>NEXT_PUBLIC_APP_URL:</strong> {process.env.NEXT_PUBLIC_APP_URL || "Not set"}
            </li>
            <li>
              <strong>NEXT_PUBLIC_ERROR_LOGGING_ENDPOINT:</strong>{" "}
              {process.env.NEXT_PUBLIC_ERROR_LOGGING_ENDPOINT || "Not set"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
