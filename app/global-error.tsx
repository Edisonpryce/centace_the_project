"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h1>
            <p className="mb-4 text-gray-700">We're sorry, but there was an error loading the application.</p>
            {process.env.NODE_ENV === "development" && (
              <div className="mb-4 p-4 bg-gray-100 rounded overflow-auto">
                <p className="font-mono text-sm text-red-500">{error.message}</p>
                {error.stack && <pre className="mt-2 font-mono text-xs text-gray-700 overflow-auto">{error.stack}</pre>}
              </div>
            )}
            <button
              onClick={reset}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
