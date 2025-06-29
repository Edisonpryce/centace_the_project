"use client"

import type React from "react"

import { useEffect } from "react"
import { toast } from "@/hooks/use-toast"
import { AlertCircle, XCircle, AlertTriangle, Info } from "lucide-react"
import { AppError } from "@/lib/errors/app-error"

interface ErrorToastProps {
  error: AppError
  id?: string
  action?: React.ReactNode
}

export function showErrorToast(error: AppError | Error | unknown, action?: React.ReactNode) {
  const appError = AppError.fromError(error)

  // Generate a unique ID for the toast
  const id = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  toast({
    id,
    variant: "destructive",
    title: getErrorTitle(appError),
    description: appError.message,
    action,
  })

  return id
}

export function ErrorToast({ error, id, action }: ErrorToastProps) {
  useEffect(() => {
    toast({
      id,
      variant: "destructive",
      title: getErrorTitle(error),
      description: error.message,
      action,
    })
  }, [error, id, action])

  return null
}

function getErrorTitle(error: AppError): string {
  switch (error.code) {
    case "AUTH_ERROR":
      return "Authentication Error"
    case "NETWORK_ERROR":
      return "Network Error"
    case "DATA_FETCH_ERROR":
      return "Data Fetch Error"
    case "VALIDATION_ERROR":
      return "Validation Error"
    case "DATABASE_ERROR":
      return "Database Error"
    default:
      return "Error"
  }
}

export function getErrorIcon(error: AppError) {
  switch (error.severity) {
    case "critical":
      return <XCircle className="h-5 w-5" />
    case "high":
      return <AlertCircle className="h-5 w-5" />
    case "medium":
      return <AlertTriangle className="h-5 w-5" />
    case "low":
      return <Info className="h-5 w-5" />
    default:
      return <AlertCircle className="h-5 w-5" />
  }
}
