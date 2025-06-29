"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client-only"

export default function TestConnectionPage() {
  const [clientStatus, setClientStatus] = useState<"loading" | "success" | "error">("loading")
  const [serverStatus, setServerStatus] = useState<"loading" | "success" | "error">("loading")
  const [clientMessage, setClientMessage] = useState("")
  const [serverMessage, setServerMessage] = useState("")

  // Test client-side connection
  useEffect(() => {
    async function testClientConnection() {
      try {
        const { data, error } = await supabase.from("profiles").select("count").limit(1)

        if (error) {
          console.error("Client connection error:", error)
          setClientStatus("error")
          setClientMessage(error.message)
          return
        }

        setClientStatus("success")
        setClientMessage("Successfully connected to Supabase from the client")
      } catch (error) {
        console.error("Client connection test failed:", error)
        setClientStatus("error")
        setClientMessage(error instanceof Error ? error.message : "Unknown error")
      }
    }

    testClientConnection()
  }, [])

  // Test server-side connection
  useEffect(() => {
    async function testServerConnection() {
      try {
        const response = await fetch("/api/test-connection")
        const data = await response.json()

        if (!data.success) {
          setServerStatus("error")
          setServerMessage(data.error || "Failed to connect to Supabase from the server")
          return
        }

        setServerStatus("success")
        setServerMessage("Successfully connected to Supabase from the server")
      } catch (error) {
        console.error("Server connection test failed:", error)
        setServerStatus("error")
        setServerMessage(error instanceof Error ? error.message : "Unknown error")
      }
    }

    testServerConnection()
  }, [])

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Client Connection */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Client-side Connection</h2>
          <div className="flex items-center mb-4">
            <div
              className={`w-4 h-4 rounded-full mr-2 ${
                clientStatus === "loading"
                  ? "bg-yellow-500"
                  : clientStatus === "success"
                    ? "bg-green-500"
                    : "bg-red-500"
              }`}
            ></div>
            <span className="font-medium">
              {clientStatus === "loading"
                ? "Testing connection..."
                : clientStatus === "success"
                  ? "Connected"
                  : "Connection failed"}
            </span>
          </div>
          {clientMessage && (
            <div
              className={`p-3 rounded ${
                clientStatus === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {clientMessage}
            </div>
          )}
        </div>

        {/* Server Connection */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Server-side Connection</h2>
          <div className="flex items-center mb-4">
            <div
              className={`w-4 h-4 rounded-full mr-2 ${
                serverStatus === "loading"
                  ? "bg-yellow-500"
                  : serverStatus === "success"
                    ? "bg-green-500"
                    : "bg-red-500"
              }`}
            ></div>
            <span className="font-medium">
              {serverStatus === "loading"
                ? "Testing connection..."
                : serverStatus === "success"
                  ? "Connected"
                  : "Connection failed"}
            </span>
          </div>
          {serverMessage && (
            <div
              className={`p-3 rounded ${
                serverStatus === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {serverMessage}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <p>
            <strong>NEXT_PUBLIC_SUPABASE_URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}
          </p>
          <p>
            <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>{" "}
            {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"}
          </p>
          <p className="text-sm text-gray-500 mt-2">Note: Service role key status is only visible on the server</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Make sure your Supabase project is active and not paused</li>
          <li>Verify that your environment variables are correctly set in Vercel</li>
          <li>Check that your IP is not blocked by Supabase</li>
          <li>Ensure your database is not in maintenance mode</li>
          <li>Verify that your tables and schemas match what your code expects</li>
        </ul>
      </div>
    </div>
  )
}
