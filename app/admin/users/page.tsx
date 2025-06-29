import { getUsers } from "@/lib/services/admin-service"
import { checkAdminRole } from "@/lib/services/admin-service"
import UsersTable from "./components/users-table"

export const metadata = {
  title: "User Management | Admin Dashboard",
}

// Add this export to make the route dynamic
export const dynamic = "force-dynamic"

export default async function UsersPage() {
  try {
    const users = await getUsers()
    const { role } = await checkAdminRole()
    const isSuperAdmin = role === "super_admin"

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        </div>

        <UsersTable users={users} isSuperAdmin={isSuperAdmin} />
      </div>
    )
  } catch (error) {
    console.error("Error in UsersPage:", error)
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        </div>
        <div className="p-4 border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-md">
          <p>Unable to load users. Please try again later.</p>
        </div>
      </div>
    )
  }
}
