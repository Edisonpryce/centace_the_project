"use client"

import { useAuth } from "@/lib/context/auth-context"
import { AlertTriangle } from "lucide-react"

export function SupabaseMissingNotice() {
  const { isUsingMockClient } = useAuth()

  if (!isUsingMockClient) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-100 dark:bg-yellow-900 p-4 z-50">
      <div className="container mx-auto flex items-center gap-3">
        <AlertTriangle className="h-5 w-5 text-yellow-700 dark:text-yellow-300" />
        <div className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Supabase not connected:</strong> Environment variables are missing. Some features will be limited.
          <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="ml-2 underline">
            Set up Supabase
          </a>
        </div>
      </div>
    </div>
  )
}
