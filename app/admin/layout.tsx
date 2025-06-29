import type React from "react"
import { checkAdminRole } from "@/lib/services/admin-service"
import { redirect } from "next/navigation"
import AdminSidebar from "./components/admin-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

// Add this export to make the route dynamic
export const dynamic = "force-dynamic"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side role check
  const { isAdmin, role } = await checkAdminRole()

  if (!isAdmin) {
    redirect("/dashboard")
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar userRole={role} />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
