import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/lib/types/database"

export async function getProjectsServer() {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      },
    )

    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching projects (server):", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getProjectsServer:", error)
    return []
  }
}

export async function getProjectsByCategoryServer(category: string) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      },
    )

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false })

    if (error) {
      console.error(`Error fetching projects for category ${category} (server):`, error)
      return []
    }

    return data || []
  } catch (error) {
    console.error(`Error in getProjectsByCategoryServer for category ${category}:`, error)
    return []
  }
}

export async function getProjectByIdServer(projectId: string) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      },
    )

    const { data, error } = await supabase.from("projects").select("*").eq("id", projectId).single()

    if (error) {
      console.error(`Error fetching project with ID ${projectId} (server):`, error)
      return null
    }

    return data || null
  } catch (error) {
    console.error(`Error in getProjectByIdServer for ID ${projectId}:`, error)
    return null
  }
}
