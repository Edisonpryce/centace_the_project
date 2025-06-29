"use client"

import { useState, useCallback } from "react"
import { logError } from "@/lib/services/error-logger"
import { AppError, NetworkError, ValidationError } from "@/lib/errors/app-error"

interface UseSafeMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void
  onError?: (error: AppError, variables: TVariables) => void
  errorMessage?: string
  validate?: (variables: TVariables) => boolean | string
}

interface UseSafeMutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => Promise<TData | undefined>
  data: TData | undefined
  error: AppError | null
  isLoading: boolean
  isError: boolean
  reset: () => void
}

export function useSafeMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: UseSafeMutationOptions<TData, TVariables> = {},
): UseSafeMutationResult<TData, TVariables> {
  const { onSuccess, onError, errorMessage = "An error occurred during the operation", validate } = options

  const [data, setData] = useState<TData | undefined>(undefined)
  const [error, setError] = useState<AppError | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const mutate = useCallback(
    async (variables: TVariables): Promise<TData | undefined> => {
      // Reset state
      setIsLoading(true)
      setError(null)

      // Validate input if validation function is provided
      if (validate) {
        const validationResult = validate(variables)
        if (validationResult !== true) {
          const validationError = ValidationError(
            typeof validationResult === "string" ? validationResult : "Validation failed",
            { variables },
          )
          setError(validationError)
          setIsLoading(false)

          if (onError) {
            onError(validationError, variables)
          }

          return undefined
        }
      }

      try {
        const result = await mutationFn(variables)
        setData(result)

        if (onSuccess) {
          onSuccess(result, variables)
        }

        return result
      } catch (err) {
        let appError: AppError

        // Handle network errors
        if (err instanceof Error && err.message.includes("network")) {
          appError = NetworkError(errorMessage, { variables, originalError: err })
        } else {
          appError = AppError.fromError(err)
          appError.message = errorMessage
          appError.context = { ...appError.context, variables }
        }

        setError(appError)
        logError(appError)

        if (onError) {
          onError(appError, variables)
        }

        return undefined
      } finally {
        setIsLoading(false)
      }
    },
    [mutationFn, errorMessage, onSuccess, onError, validate],
  )

  const reset = useCallback(() => {
    setData(undefined)
    setError(null)
    setIsLoading(false)
  }, [])

  return {
    mutate,
    data,
    error,
    isLoading,
    isError: error !== null,
    reset,
  }
}
