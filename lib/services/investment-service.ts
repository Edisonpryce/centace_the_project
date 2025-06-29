import { supabase } from "@/lib/supabase/client"
import type { Investment } from "@/lib/types/database"

export async function getUserInvestments(userId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from("investments")
    .select(`
      *,
      projects (*)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user investments:", error)
    return []
  }

  return data || []
}

export async function createInvestment(
  investment: Omit<Investment, "id" | "created_at" | "updated_at">,
): Promise<Investment | null> {
  const { data, error } = await supabase.from("investments").insert([investment]).select().single()

  if (error) {
    console.error("Error creating investment:", error)
    return null
  }

  return data
}
