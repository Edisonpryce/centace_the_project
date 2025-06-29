import { getAllAnnouncements } from "@/lib/services/announcement-service"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import AnnouncementsTable from "./components/announcements-table"

// Add this export to make the route dynamic
export const dynamic = "force-dynamic"

export const metadata = {
  title: "Manage Announcements | Admin Dashboard",
}

export default async function AnnouncementsPage() {
  const announcements = await getAllAnnouncements()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Manage Announcements</h1>
        <Link href="/admin/announcements/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Announcement
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <AnnouncementsTable announcements={announcements} />
      </div>
    </div>
  )
}
