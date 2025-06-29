"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface RetryButtonProps {
  onRetry: () => Promise<void> | void
  children?: React.ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  maxRetries?: number
}

export function RetryButton({
  onRetry,
  children = "Retry",
  className,
  variant = "outline",
  size = "default",
  maxRetries = Number.POSITIVE_INFINITY,
}: RetryButtonProps) {
  const [isRetrying, setIsRetrying] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [retryDisabled, setRetryDisabled] = useState(false)

  const handleRetry = async () => {
    if (retryCount >= maxRetries) {
      setRetryDisabled(true)
      return
    }

    setIsRetrying(true)
    try {
      await onRetry()
      setRetryCount((prev) => prev + 1)
    } finally {
      setIsRetrying(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleRetry}
      disabled={isRetrying || retryDisabled}
    >
      {isRetrying ? (
        <>
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          Retrying...
        </>
      ) : (
        <>
          <RefreshCw className="mr-2 h-4 w-4" />
          {children}
          {maxRetries !== Number.POSITIVE_INFINITY && retryCount > 0 && ` (${retryCount}/${maxRetries})`}
        </>
      )}
    </Button>
  )
}
