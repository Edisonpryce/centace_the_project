"use client"
import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error
    console.error("Error caught by boundary:", error)
    console.error("Component stack:", errorInfo.componentStack)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="p-4 border border-red-300 rounded-md bg-red-50 dark:bg-red-900/20 dark:border-red-800">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-400">Something went wrong</h2>
          {process.env.NODE_ENV !== "production" && this.state.error && (
            <div className="mt-2">
              <p className="text-sm text-red-700 dark:text-red-300">{this.state.error.message}</p>
              <pre className="mt-2 text-xs overflow-auto p-2 bg-red-100 dark:bg-red-900/40 rounded">
                {this.state.error.stack}
              </pre>
            </div>
          )}
          <Button onClick={() => this.setState({ hasError: false, error: null })} className="mt-4" variant="outline">
            Try again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
