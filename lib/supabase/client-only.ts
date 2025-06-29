import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "../types/database"

// Create a singleton to avoid multiple instances
let supabaseClient: ReturnType<typeof createBrowserClient<Database>> | null = null

// Create a mock client that doesn't throw errors when env vars are missing
const createMockClient = () => {
  console.warn(
    "Using mock Supabase client because environment variables are missing. " +
      "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.",
  )

  // Return a mock client with the same interface but no-op methods
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({
        data: { user: null, session: null },
        error: { message: "Auth disabled - Supabase environment variables missing" },
      }),
      signUp: async () => ({
        data: { user: null, session: null },
        error: { message: "Auth disabled - Supabase environment variables missing" },
      }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
          limit: () => ({ data: [], error: null }),
          order: () => ({ data: [], error: null }),
          range: () => ({ data: [], error: null }),
          data: [],
          error: null,
        }),
        limit: () => ({ data: [], error: null }),
        order: () => ({ data: [], error: null }),
        range: () => ({ data: [], error: null }),
        data: [],
        error: null,
      }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ data: null, error: null }),
      delete: () => ({ data: null, error: null }),
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        data: null,
        error: null,
      }),
    }),
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
      }),
    },
    rpc: () => ({ data: null, error: null }),
  } as unknown as ReturnType<typeof createBrowserClient<Database>>
}

export function getSupabaseBrowser() {
  // If we already have a client, return it
  if (supabaseClient) {
    return supabaseClient
  }

  // Check if environment variables are available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Use mock client instead of throwing an error
    supabaseClient = createMockClient()
    return supabaseClient
  }

  // Create a real client if we have environment variables
  try {
    supabaseClient = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    )
    return supabaseClient
  } catch (error) {
    console.error("Error initializing Supabase client:", error)
    // Use mock client as fallback
    supabaseClient = createMockClient()
    return supabaseClient
  }
}

// Export a pre-initialized client for direct imports
export const supabase = getSupabaseBrowser()
