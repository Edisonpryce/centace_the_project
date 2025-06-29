export type ErrorSeverity = "low" | "medium" | "high" | "critical"
export type ErrorContext = Record<string, unknown>

export class AppError extends Error {
  public readonly code: string
  public readonly severity: ErrorSeverity
  public readonly context: ErrorContext
  public readonly isOperational: boolean
  public readonly originalError?: Error

  constructor({
    message,
    code = "UNKNOWN_ERROR",
    severity = "medium",
    context = {},
    isOperational = true,
    originalError,
  }: {
    message: string
    code?: string
    severity?: ErrorSeverity
    context?: ErrorContext
    isOperational?: boolean
    originalError?: Error
  }) {
    super(message)
    this.name = "AppError"
    this.code = code
    this.severity = severity
    this.context = context
    this.isOperational = isOperational
    this.originalError = originalError

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
  }

  public static fromError(error: unknown): AppError {
    if (error instanceof AppError) {
      return error
    }

    const message = error instanceof Error ? error.message : String(error)
    return new AppError({
      message,
      code: "UNKNOWN_ERROR",
      severity: "medium",
      isOperational: false,
      originalError: error instanceof Error ? error : undefined,
    })
  }
}

// Predefined error types
export const AuthError = (message: string, context = {}) =>
  new AppError({
    message,
    code: "AUTH_ERROR",
    severity: "high",
    context,
  })

export const NetworkError = (message: string, context = {}) =>
  new AppError({
    message,
    code: "NETWORK_ERROR",
    severity: "medium",
    context,
  })

export const DataFetchError = (message: string, context = {}) =>
  new AppError({
    message,
    code: "DATA_FETCH_ERROR",
    severity: "medium",
    context,
  })

export const ValidationError = (message: string, context = {}) =>
  new AppError({
    message,
    code: "VALIDATION_ERROR",
    severity: "low",
    context,
  })

export const DatabaseError = (message: string, context = {}) =>
  new AppError({
    message,
    code: "DATABASE_ERROR",
    severity: "high",
    context,
  })
