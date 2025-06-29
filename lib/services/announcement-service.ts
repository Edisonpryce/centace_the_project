// Import the client-only Supabase instance for client components
import { supabase } from "@/lib/supabase/client-only"
import { DataFetchError, DatabaseError } from "@/lib/errors/app-error"

export type Announcement = {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
  is_active: boolean
  priority: number
}

// Client-side function to get active announcements
export async function getActiveAnnouncements(): Promise<Announcement[]> {
  try {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) {
      throw DataFetchError(`Error fetching announcements: ${error.message}`, {
        supabaseError: error,
        table: "announcements",
        operation: "select",
      })
    }

    return data || []
  } catch (error) {
    if (error instanceof Error) {
      throw DataFetchError("Failed to fetch announcements", { originalError: error })
    }
    throw error
  }
}

// Client-side function to get all announcements
export async function getAllAnnouncements(): Promise<Announcement[]> {
  try {
    const { data, error } = await supabase.from("announcements").select("*").order("created_at", { ascending: false })

    if (error) {
      throw DataFetchError(`Error fetching all announcements: ${error.message}`, {
        supabaseError: error,
        table: "announcements",
        operation: "select",
      })
    }

    return data || []
  } catch (error) {
    if (error instanceof Error) {
      throw DataFetchError("Failed to fetch all announcements", { originalError: error })
    }
    throw error
  }
}

// Client-side function to get a single announcement
export async function getAnnouncementById(id: string): Promise<Announcement | null> {
  try {
    const { data, error } = await supabase.from("announcements").select("*").eq("id", id).single()

    if (error) {
      throw DataFetchError(`Error fetching announcement with id ${id}: ${error.message}`, {
        supabaseError: error,
        table: "announcements",
        operation: "select",
        id,
      })
    }

    return data || null
  } catch (error) {
    if (error instanceof Error) {
      throw DataFetchError(`Failed to fetch announcement with id ${id}`, { originalError: error, id })
    }
    throw error
  }
}

// Client-side function to create an announcement
export async function createAnnouncement(
  announcement: Omit<Announcement, "id" | "created_at" | "updated_at">,
): Promise<Announcement | null> {
  try {
    const { data, error } = await supabase
      .from("announcements")
      .insert([
        {
          ...announcement,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      throw DatabaseError(`Error creating announcement: ${error.message}`, {
        supabaseError: error,
        table: "announcements",
        operation: "insert",
        data: announcement,
      })
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw DatabaseError("Failed to create announcement", { originalError: error, data: announcement })
    }
    throw error
  }
}

// Client-side function to update an announcement
export async function updateAnnouncement(
  id: string,
  announcement: Partial<Omit<Announcement, "id" | "created_at" | "updated_at">>,
): Promise<Announcement | null> {
  try {
    const { data, error } = await supabase
      .from("announcements")
      .update({
        ...announcement,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw DatabaseError(`Error updating announcement with id ${id}: ${error.message}`, {
        supabaseError: error,
        table: "announcements",
        operation: "update",
        id,
        data: announcement,
      })
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw DatabaseError(`Failed to update announcement with id ${id}`, {
        originalError: error,
        id,
        data: announcement,
      })
    }
    throw error
  }
}

// Client-side function to delete an announcement
export async function deleteAnnouncement(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("announcements").delete().eq("id", id)

    if (error) {
      throw DatabaseError(`Error deleting announcement with id ${id}: ${error.message}`, {
        supabaseError: error,
        table: "announcements",
        operation: "delete",
        id,
      })
    }

    return true
  } catch (error) {
    if (error instanceof Error) {
      throw DatabaseError(`Failed to delete announcement with id ${id}`, { originalError: error, id })
    }
    throw error
  }
}
