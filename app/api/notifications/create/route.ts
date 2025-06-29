import { NextResponse } from "next/server"
import { createNotification } from "@/lib/services/notification-service"

export async function POST(request: Request) {
  try {
    const { userId, title, message, type, relatedId } = await request.json()

    // Validate required fields
    if (!userId || !title || !message) {
      return NextResponse.json({ error: "Missing required fields: userId, title, message" }, { status: 400 })
    }

    // Create the notification using the service that now uses the service role
    const notification = await createNotification({
      user_id: userId,
      title,
      message,
      type: type || "general",
      is_read: false,
      related_id: relatedId || null,
    })

    if (!notification) {
      return NextResponse.json({ error: "Failed to create notification" }, { status: 500 })
    }

    return NextResponse.json({ success: true, notification })
  } catch (error) {
    console.error("Error in notification API route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
