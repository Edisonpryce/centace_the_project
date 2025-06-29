"use client"

import { useEffect, useState } from "react"
import { APP_CONFIG, EMAIL_CONFIG, checkRequiredEnvVars } from "@/lib/config/env-config"

export default function DebugPage() {
  const [envStatus, setEnvStatus] = useState<{
    missing: string[]
    available: string[]
  }>({ missing: [], available: [] })

  const [clientEnv, setClientEnv] = useState<Record<string, string>>({})

  useEffect(() => {
    // Check environment variables
    const status = checkRequiredEnvVars()
    setEnvStatus(status)

    // Get client-side environment variables
    if (typeof window !== "undefined") {
      const env: Record<string, string> = {}
      if (window.__ENV__) {
        Object.keys(window.__ENV__).forEach((key) => {
          env[key] = window.__ENV__[key]
        })
      }
      setClientEnv(env)
    }
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Environment Debug</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">App Configuration</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <pre className="whitespace-pre-wrap">{JSON.stringify(APP_CONFIG, null, 2)}</pre>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Email Configuration</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(
              {
                ...EMAIL_CONFIG,
                // Mask password for security
                password: EMAIL_CONFIG.password ? "********" : undefined,
              },
              null,
              2,
            )}
          </pre>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Environment Variables Status</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <h3 className="font-medium mb-2">Missing Variables:</h3>
          {envStatus.missing.length === 0 ? (
            <p className="text-green-500">No missing required variables!</p>
          ) : (
            <ul className="list-disc pl-5">
              {envStatus.missing.map((name) => (
                <li key={name} className="text-red-500">
                  {name}
                </li>
              ))}
            </ul>
          )}

          <h3 className="font-medium mt-4 mb-2">Available Variables:</h3>
          {envStatus.available.length === 0 ? (
            <p className="text-yellow-500">No environment variables available.</p>
          ) : (
            <ul className="list-disc pl-5">
              {envStatus.available.map((name) => (
                <li key={name} className="text-green-500">
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Client-Side Environment Variables</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <pre className="whitespace-pre-wrap">{JSON.stringify(clientEnv, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
