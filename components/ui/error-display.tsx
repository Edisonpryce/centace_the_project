"use client"
import { AlertCircle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface ErrorDisplayProps {
  title?: string
  description?: string
  error?: Error | null
  showErrorDetails?: boolean
  onRetry?: () => void
  onHome?: () => void
  variant?: "inline" | "fullpage" | "card"
  severity?: "warning" | "error" | "info"
}

export function ErrorDisplay({
  title = "An error occurred",
  description = "We encountered an error while processing your request.",
  error,
  showErrorDetails = false,
  onRetry,
  onHome,
  variant = "card",
  severity = "error",
}: ErrorDisplayProps) {
  const router = useRouter()

  const handleHomeClick = () => {
    if (onHome) {
      onHome()
    } else {
      router.push("/")
    }
  }

  const severityStyles = {
    error: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300",
    warning: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300",
    info: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
  }

  const iconColor = {
    error: "text-red-500 dark:text-red-400",
    warning: "text-amber-500 dark:text-amber-400",
    info: "text-blue-500 dark:text-blue-400",
  }

  if (variant === "inline") {
    return (
      <div className={`p-4 rounded-md ${severityStyles[severity]}`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className={`h-5 w-5 ${iconColor[severity]}`} aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium">{title}</h3>
            <div className="mt-2 text-sm">
              <p>{description}</p>
            </div>
            {showErrorDetails && error && (
              <div className="mt-2 text-sm">
                <p className="font-mono text-xs">{error.message}</p>
              </div>
            )}
            {onRetry && (
              <div className="mt-4">
                <Button size="sm" variant="outline" onClick={onRetry} className="flex items-center">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try again
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (variant === "fullpage") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-6">
            <AlertCircle className={`h-12 w-12 mx-auto ${iconColor[severity]}`} />
            <h1 className="mt-4 text-2xl font-bold">{title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
            {showErrorDetails && error && (
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md overflow-auto text-left">
                <p className="font-mono text-xs">{error.message}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onRetry && (
              <Button onClick={onRetry} className="flex items-center justify-center">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try again
              </Button>
            )}
            <Button variant="outline" onClick={handleHomeClick} className="flex items-center justify-center">
              <Home className="mr-2 h-4 w-4" />
              Go to home page
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Default card variant
  return (
    <Card className={`border ${severityStyles[severity]}`}>
      <CardHeader>
        <div className="flex items-center">
          <AlertCircle className={`h-5 w-5 mr-2 ${iconColor[severity]}`} />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {showErrorDetails && error && (
        <CardContent>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-auto">
            <p className="font-mono text-xs">{error.message}</p>
          </div>
        </CardContent>
      )}
      <CardFooter className="flex justify-end space-x-2">
        {onRetry && (
          <Button variant="outline" onClick={onRetry} className="flex items-center">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        )}
        <Button variant="ghost" onClick={handleHomeClick} className="flex items-center">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
      </CardFooter>
    </Card>
  )
}
