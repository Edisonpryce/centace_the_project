"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AccountPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the account statement page
    router.push("/dashboard/account/statement")
  }, [router])

  // Show a simple loading state while redirecting
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500">Loading account information...</p>
    </div>
  )
}
