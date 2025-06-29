"use server"

import { getServiceSupabase } from "@/lib/supabase/server-actions"
import type { Notification } from "@/lib/types/database"

export async function createNotificationServerAction(
  notification: Omit<Notification, "id" | "created_at">,
): Promise<Notification | null> {
  try {
    // Use the service role client to bypass RLS policies
    const serviceSupabase = await getServiceSupabase()

    const { data, error } = await serviceSupabase.from("notifications").insert([notification]).select().single()

    if (error) {
      console.error("Error creating notification in server action:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in createNotificationServerAction:", error)
    return null
  }
}
