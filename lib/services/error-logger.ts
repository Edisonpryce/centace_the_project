import { APP_CONFIG } from "@/lib/config/env-config"

export type ErrorSeverity = "low" | "medium" | "high" | "critical"

export interface ErrorContext {
  [key: string]: any
  userId?: string
  url?: string
  component?: string
  action?: string
}

// Simple error logger functions
export function logError(error: unknown, context: Record<string, any> = {}) {
  console.error("[ERROR]", error, context)
}

export function logWarning(message: string, context: Record<string, any> = {}) {
  console.warn("[WARNING]", message, context)
}

export function logInfo(message: string, context: Record<string, any> = {}) {
  console.info("[INFO]", message, context)
}

// Basic error class
export class AppError extends Error {
  code: string

  constructor(message: string, code = "UNKNOWN_ERROR") {
    super(message)
    this.name = "AppError"
    this.code = code

    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  static fromError(error: unknown): AppError {
    if (error instanceof AppError) {
      return error
    }

    if (error instanceof Error) {
      return new AppError(error.message)
    }

    return new AppError(String(error))
  }
}

// Get environment variables safely
function getEnvVar(name: string, defaultValue: string): string {
  // Try to get from window.__ENV__ first (client-side)
  if (typeof window !== "undefined" && window.__ENV__ && window.__ENV__[name]) {
    return window.__ENV__[name]
  }

  // Try to get from process.env (server-side)
  if (process.env[name]) {
    return process.env[name] as string
  }

  // Fallback to default
  return defaultValue
}

// Error logger service
class ErrorLoggerService {
  private async sendErrorToApi(error: AppError | Error, context: ErrorContext = {}): Promise<boolean> {
    try {
      const errorData = {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error instanceof AppError ? error.code : "UNKNOWN_ERROR",
        severity: error instanceof AppError ? error.severity : "high",
        url: typeof window !== "undefined" ? window.location.href : context.url || "",
        userId: context.userId || "",
        browserInfo: typeof navigator !== "undefined" ? navigator.userAgent : "",
        app_version: getEnvVar("NEXT_PUBLIC_APP_VERSION", APP_CONFIG.version),
        timestamp: new Date().toISOString(),
        metadata: {
          ...context,
          ...(error instanceof AppError ? error.context : {}),
        },
      }

      const endpoint = getEnvVar("NEXT_PUBLIC_ERROR_LOGGING_ENDPOINT", APP_CONFIG.errorLoggingEndpoint)

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(errorData),
        // Use keepalive to ensure the request completes even if the page is unloading
        keepalive: true,
      })

      return response.ok
    } catch (err) {
      // Fallback to console if remote logging fails
      console.error("Failed to send error to API:", err)
      return false
    }
  }

  public async logError(error: Error | AppError | unknown, context: ErrorContext = {}): Promise<void> {
    const appError = AppError.fromError(error)

    // Always log to console in development
    if (process.env.NODE_ENV !== "production") {
      console.error(
        `[ERROR] ${appError.message}`,
        {
          code: appError.code,
          severity: appError.severity,
          context: { ...appError.context, ...context },
        },
        appError.stack,
      )
    }

    // Send to API in all environments
    await this.sendErrorToApi(appError, context)
  }

  public async logWarning(message: string, context: ErrorContext = {}): Promise<void> {
    console.warn(`[WARNING] ${message}`, context)

    // Only send warnings to API in production
    if (process.env.NODE_ENV === "production") {
      const warningError = new AppError(message, {
        code: "WARNING",
        severity: "low",
        context,
      })

      await this.sendErrorToApi(warningError, context)
    }
  }

  public async logInfo(message: string, context: ErrorContext = {}): Promise<void> {
    console.info(`[INFO] ${message}`, context)
    // We don't send info logs to the API
  }
}

// Create singleton instance
export const errorLogger = new ErrorLoggerService()

// Helper functions for easier usage
// export const logError = (error: unknown, context: ErrorContext = {}) => {
//   return errorLogger.logError(error, context)
// }

// export const logWarning = (message: string, context: ErrorContext = {}) => {
//   return errorLogger.logWarning(message, context)
// }

// export const logInfo = (message: string, context: ErrorContext = {}) => {
//   return errorLogger.logInfo(message, context)
// }
