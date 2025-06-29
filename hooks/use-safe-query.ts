"use client"

import { useState, useEffect, useCallback } from "react"
import { logError } from "@/lib/services/error-logger"
import { type AppError, DataFetchError, NetworkError } from "@/lib/errors/app-error"

interface UseSafeQueryOptions<T> {
  initialData?: T
  onSuccess?: (data: T) => void
  onError?: (error: AppError) => void
  errorMessage?: string
  retryCount?: number
  retryDelay?: number
  skipInitialFetch?: boolean
}

interface UseSafeQueryResult<T> {
  data: T | undefined
  error: AppError | null
  isLoading: boolean
  isError: boolean
  refetch: () => Promise<void>
  reset: () => void
}

export function useSafeQuery<T>(
  queryFn: () => Promise<T>,
  options: UseSafeQueryOptions<T> = {},
): UseSafeQueryResult<T> {
  const {
    initialData,
    onSuccess,
    onError,
    errorMessage = "Failed to fetch data",
    retryCount = 0,
    retryDelay = 1000,
    skipInitialFetch = false,
  } = options

  const [data, setData] = useState<T | undefined>(initialData)
  const [error, setError] = useState<AppError | null>(null)
  const [isLoading, setIsLoading] = useState(!skipInitialFetch)
  const [retries, setRetries] = useState(0)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await queryFn()
      setData(result)
      if (onSuccess) {
        onSuccess(result)
      }
    } catch (err) {
      let appError: AppError

      // Handle network errors
      if (err instanceof Error && err.message.includes("network")) {
        appError = NetworkError(errorMessage, { originalError: err })
      } else {
        appError = DataFetchError(errorMessage, { originalError: err })
      }

      setError(appError)
      logError(appError)

      if (onError) {
        onError(appError)
      }

      // Retry logic
      if (retries < retryCount) {
        setTimeout(() => {
          setRetries((prev) => prev + 1)
          fetchData()
        }, retryDelay * Math.pow(2, retries)) // Exponential backoff
      }
    } finally {
      setIsLoading(false)
    }
  }, [queryFn, errorMessage, onSuccess, onError, retries, retryCount, retryDelay])

  useEffect(() => {
    if (!skipInitialFetch) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipInitialFetch])

  const refetch = useCallback(async () => {
    setRetries(0)
    await fetchData()
  }, [fetchData])

  const reset = useCallback(() => {
    setData(initialData)
    setError(null)
    setIsLoading(false)
    setRetries(0)
  }, [initialData])

  return {
    data,
    error,
    isLoading,
    isError: error !== null,
    refetch,
    reset,
  }
}
