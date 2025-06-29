import { supabase } from "@/lib/supabase/client"
import { getServiceSupabase } from "@/lib/supabase/server-actions"
import type { Notification } from "@/lib/types/database"
import { sendEmailNotification } from "@/lib/services/email-service"

// Client-side notification functions
export async function getUserNotifications(userId: string): Promise<Notification[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching notifications:", error)
    return []
  }

  return data || []
}

export async function markNotificationAsRead(notificationId: string): Promise<boolean> {
  const { error } = await supabase.from("notifications").update({ is_read: true }).eq("id", notificationId)

  if (error) {
    console.error("Error marking notification as read:", error)
    return false
  }

  return true
}

export async function markAllNotificationsAsRead(userId: string): Promise<boolean> {
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("user_id", userId)
    .eq("is_read", false)

  if (error) {
    console.error("Error marking all notifications as read:", error)
    return false
  }

  return true
}

export async function deleteNotification(notificationId: string): Promise<boolean> {
  const { error } = await supabase.from("notifications").delete().eq("id", notificationId)

  if (error) {
    console.error("Error deleting notification:", error)
    return false
  }

  return true
}

// Server-side notification functions (for use in server actions and route handlers)
export async function createNotification(
  notification: Omit<Notification, "id" | "created_at">,
): Promise<Notification | null> {
  try {
    // Use the service role client to bypass RLS policies
    const serviceSupabase = await getServiceSupabase()

    const { data, error } = await serviceSupabase.from("notifications").insert([notification]).select().single()

    if (error) {
      console.error("Error creating notification:", error)
      return null
    }

    // Send email notification
    if (data) {
      // We don't await this to avoid blocking the response
      sendEmailNotification(data).catch((error) => {
        console.error("Error sending email notification:", error)
      })
    }

    return data
  } catch (error) {
    console.error("Error in createNotification:", error)
    return null
  }
}

// Helper function to create investment notifications
export async function createInvestmentNotification(
  userId: string,
  projectName: string,
  projectId: string,
  action: "purchase" | "update" | "return",
): Promise<Notification | null> {
  let title = ""
  let message = ""
  let type = ""

  switch (action) {
    case "purchase":
      title = "Investment Successful"
      message = `Your investment in ${projectName} has been successfully processed.`
      type = "investment"
      break
    case "update":
      title = "Investment Update"
      message = `There's a new update on your investment in ${projectName}.`
      type = "update"
      break
    case "return":
      title = "Return Distributed"
      message = `A return from your investment in ${projectName} has been distributed to your account.`
      type = "return"
      break
  }

  return createNotification({
    user_id: userId,
    title,
    message,
    type,
    is_read: false,
    related_id: projectId,
  })
}
