"use client"

import { useState } from "react"
import { useAuth } from "@/lib/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestBookingsPage() {
  const { user } = useAuth()
  const [testResult, setTestResult] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testBookingsTable = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/test-bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.id }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to test bookings table")
      }

      setTestResult(JSON.stringify(data, null, 2))
    } catch (err) {
      console.error("Error testing bookings table:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Test Bookings Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={testBookingsTable} disabled={isLoading || !user}>
              {isLoading ? "Testing..." : "Test Bookings Table"}
            </Button>

            {error && (
              <div className="p-4 bg-red-100 text-red-800 rounded-md">
                <p className="font-medium">Error:</p>
                <p>{error}</p>
              </div>
            )}

            {testResult && (
              <div className="p-4 bg-gray-100 rounded-md">
                <p className="font-medium mb-2">Test Result:</p>
                <pre className="whitespace-pre-wrap text-sm">{testResult}</pre>
              </div>
            )}

            {!user && (
              <div className="p-4 bg-yellow-100 text-yellow-800 rounded-md">
                <p>You need to be logged in to test the bookings table.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
