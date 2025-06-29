"use client"

import { logError } from "@/lib/services/error-logger"

interface GlobalErrorHandlerOptions {
  enableConsoleOverride?: boolean
}

export class GlobalErrorHandler {
  private originalConsoleError: typeof console.error
  private options: GlobalErrorHandlerOptions

  constructor(options: GlobalErrorHandlerOptions = {}) {
    this.options = {
      enableConsoleOverride: true,
      ...options,
    }
    this.originalConsoleError = console.error
  }

  public initialize(): void {
    if (typeof window === "undefined") return // Only run on client

    // Handle unhandled promise rejections
    window.addEventListener("unhandledrejection", this.handleUnhandledRejection)

    // Handle uncaught errors
    window.addEventListener("error", this.handleError)

    // Optionally override console.error to catch errors logged there
    if (this.options.enableConsoleOverride) {
      console.error = this.handleConsoleError
    }
  }

  public cleanup(): void {
    if (typeof window === "undefined") return // Only run on client

    window.removeEventListener("unhandledrejection", this.handleUnhandledRejection)
    window.removeEventListener("error", this.handleError)

    if (this.options.enableConsoleOverride) {
      console.error = this.originalConsoleError
    }
  }

  private handleUnhandledRejection = (event: PromiseRejectionEvent): void => {
    logError(event.reason, {
      type: "unhandledRejection",
      url: window.location.href,
    })
  }

  private handleError = (event: ErrorEvent): void => {
    logError(event.error || new Error(event.message), {
      type: "uncaughtError",
      url: window.location.href,
      fileName: event.filename,
      lineNumber: event.lineno,
      columnNumber: event.colno,
    })
  }

  private handleConsoleError = (...args: any[]): void => {
    // Call original console.error
    this.originalConsoleError.apply(console, args)

    // Extract error object if present
    const errorObject = args.find((arg) => arg instanceof Error)

    if (errorObject) {
      logError(errorObject, {
        type: "consoleError",
        url: typeof window !== "undefined" ? window.location.href : undefined,
        consoleArgs: args.filter((arg) => arg !== errorObject).map(String),
      })
    }
  }
}

// Create singleton instance
export const globalErrorHandler = new GlobalErrorHandler()

// Helper function to initialize in components
export function initializeErrorHandler(): () => void {
  globalErrorHandler.initialize()
  return () => globalErrorHandler.cleanup()
}
