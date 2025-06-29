import AnnouncementForm from "../components/announcement-form"

// Add this export to make the route dynamic
export const dynamic = "force-dynamic"

export const metadata = {
  title: "Create Announcement | Admin Dashboard",
}

export default function NewAnnouncementPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Create Announcement</h1>
      <AnnouncementForm />
    </div>
  )
}
