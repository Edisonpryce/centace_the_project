import { supabase } from "@/lib/supabase/client-only"

export async function getProjects() {
  try {
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching projects:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getProjects:", error)
    return []
  }
}

export async function getProjectsByCategory(category: string) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false })

    if (error) {
      console.error(`Error fetching projects for category ${category}:`, error)
      return []
    }

    return data || []
  } catch (error) {
    console.error(`Error in getProjectsByCategory for category ${category}:`, error)
    return []
  }
}

export async function getProjectById(projectId: string) {
  try {
    const { data, error } = await supabase.from("projects").select("*").eq("id", projectId).single()

    if (error) {
      console.error(`Error fetching project with ID ${projectId}:`, error)
      return null
    }

    return data || null
  } catch (error) {
    console.error(`Error in getProjectById for ID ${projectId}:`, error)
    return null
  }
}
