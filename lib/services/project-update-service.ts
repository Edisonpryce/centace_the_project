import { serverSupabase } from "@/lib/supabase/server"
import { createNotification } from "@/lib/services/notification-service"
import type { ProjectUpdate } from "@/lib/types/database"

export async function getProjectUpdates(projectId: string): Promise<ProjectUpdate[]> {
  const supabase = serverSupabase()
  const { data, error } = await supabase
    .from("project_updates")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching project updates:", error)
    return []
  }

  return data || []
}

export async function createProjectUpdate(
  update: Omit<ProjectUpdate, "id" | "created_at" | "likes" | "comments">,
): Promise<ProjectUpdate | null> {
  const supabase = serverSupabase()
  const { data, error } = await supabase
    .from("project_updates")
    .insert([{ ...update, likes: 0, comments: 0 }])
    .select()
    .single()

  if (error) {
    console.error("Error creating project update:", error)
    return null
  }

  // Get all users who have invested in this project
  const { data: investments, error: investmentsError } = await supabase
    .from("investments")
    .select("user_id")
    .eq("project_id", update.project_id)
    .eq("status", "completed")

  if (investmentsError) {
    console.error("Error fetching investments:", investmentsError)
  } else if (investments && investments.length > 0) {
    // Get the project name
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("name")
      .eq("id", update.project_id)
      .single()

    if (projectError) {
      console.error("Error fetching project:", projectError)
    } else if (project) {
      // Create notifications for all investors
      const uniqueUserIds = [...new Set(investments.map((inv) => inv.user_id))]

      for (const userId of uniqueUserIds) {
        await createNotification({
          user_id: userId,
          title: "Project Update",
          message: `New update for ${project.name}: ${update.title}`,
          type: "update",
          is_read: false,
          related_id: update.project_id,
        })
      }
    }
  }

  return data
}
