import { createClient } from "@supabase/supabase-js"
import type { Database } from "../types/database"

// Create a Supabase client for use in the pages directory or client components
export const createPagesSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Export a singleton instance for pages
export const pagesSupabase = createPagesSupabaseClient()
