"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Mail } from "lucide-react"

export default function TestEmailPage() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus("success")
        setMessage("Test email sent successfully! Please check your inbox.")
      } else {
        setStatus("error")
        setMessage(data.message || "Failed to send test email. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage((error as Error).message || "An unexpected error occurred. Please try again.")
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Service Test
          </CardTitle>
          <CardDescription>Send a test email to verify your email configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {status === "success" && (
                <Alert className="bg-green-50 text-green-800 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              {status === "error" && (
                <Alert className="bg-red-50 text-red-800 border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" onClick={handleSubmit} disabled={status === "loading" || !email}>
            {status === "loading" ? "Sending..." : "Send Test Email"}
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-8 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Email Configuration</h2>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
          <ul className="space-y-2">
            <li>
              <strong>Host:</strong> {process.env.EMAIL_HOST || "smtp.gmail.com"}
            </li>
            <li>
              <strong>Port:</strong> {process.env.EMAIL_PORT || "587"}
            </li>
            <li>
              <strong>Secure:</strong> {process.env.EMAIL_SECURE || "false"}
            </li>
            <li>
              <strong>From:</strong> {process.env.EMAIL_FROM || "centaceapp@gmail.com"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
