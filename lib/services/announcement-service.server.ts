"use server"

import { getServerSupabase } from "@/lib/supabase/server-actions"
import type { Announcement } from "./announcement-service"

// Server-side function to get active announcements
export async function getActiveAnnouncementsServer(): Promise<Announcement[]> {
  try {
    const supabase = await getServerSupabase()

    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching announcements:", error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error in getActiveAnnouncementsServer:", error)
    throw error
  }
}

// Add other server-side functions as needed
