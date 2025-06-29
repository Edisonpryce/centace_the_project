import { supabase } from "@/lib/supabase/client"
import type { Transaction } from "@/lib/types/database"

export async function getUserTransactions(userId: string): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user transactions:", error)
    return []
  }

  return data || []
}

export async function createTransaction(
  transaction: Omit<Transaction, "id" | "created_at">,
): Promise<Transaction | null> {
  const { data, error } = await supabase.from("transactions").insert([transaction]).select().single()

  if (error) {
    console.error("Error creating transaction:", error)
    return null
  }

  return data
}
