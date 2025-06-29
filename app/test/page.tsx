"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { APP_VERSION, FEATURES } from "@/lib/config"

export default function TestPage() {
  const [health, setHealth] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function checkHealth() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/health")
      const data = await response.json()
      setHealth(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkHealth()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">App Preview Test</h1>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Environment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>App Version: {APP_VERSION}</p>
          <p>Preview Mode: {FEATURES.isPreviewEnvironment ? "Yes" : "No"}</p>
          <p>Error Logging: {FEATURES.enableErrorLogging ? "Enabled" : "Disabled"}</p>
          <p>Email Notifications: {FEATURES.enableEmailNotifications ? "Enabled" : "Disabled"}</p>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>API Health Check</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <div className="text-red-500">
              <p>Error: {error}</p>
              <Button onClick={checkHealth} className="mt-2">
                Retry
              </Button>
            </div>
          ) : (
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto">
              {JSON.stringify(health, null, 2)}
            </pre>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button onClick={checkHealth}>Refresh Health Check</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Back to Home
        </Button>
      </div>
    </div>
  )
}
