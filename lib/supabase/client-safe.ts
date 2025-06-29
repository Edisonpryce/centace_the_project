import { createClient } from "@supabase/supabase-js"
import type { Database } from "../types/database"

// Create a single supabase client for the entire client-side application
// This version is safe to use in client components
export const createClientSafeClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
}

// Export a singleton instance
export const supabase = createClientSafeClient()
