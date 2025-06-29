import { getAnnouncementById } from "@/lib/services/announcement-service"
import AnnouncementForm from "../../components/announcement-form"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Edit Announcement | Admin Dashboard",
}

// Add this export to make the route dynamic
export const dynamic = "force-dynamic"

export default async function EditAnnouncementPage({ params }: { params: { id: string } }) {
  try {
    const announcement = await getAnnouncementById(params.id)

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Edit Announcement</h1>
        <AnnouncementForm announcement={announcement} isEditing />
      </div>
    )
  } catch (error) {
    notFound()
  }
}
