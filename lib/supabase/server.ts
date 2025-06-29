import { createClient } from "@supabase/supabase-js"
import { createServerClient as createSupabaseServerClient } from "@supabase/ssr"
import type { Database } from "../types/database"

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Safe version of cookies() that doesn't use next/headers
const getSafeCookies = () => {
  // This is a placeholder for the Pages Router
  // It will be replaced with actual implementation in the App Router
  return {
    get: (name: string) => ({ value: undefined }),
    set: () => {},
    remove: () => {},
  }
}

// Only import next/headers in server environment
let cookies: any
if (!isBrowser) {
  try {
    // Dynamic import to prevent build errors
    cookies = require("next/headers").cookies
  } catch (e) {
    // If next/headers is not available, use the safe version
    cookies = getSafeCookies
  }
}

// Export the createServerClient function that other files are trying to import
export const createServerClient = createSupabaseServerClient

// This function should only be used in Server Components or Server Actions
export function createServerSupabaseClient() {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    // Return a mock client during build time
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key",
      {
        auth: {
          persistSession: false,
        },
      },
    )
  }

  const cookieStore = isBrowser ? getSafeCookies() : cookies()

  return createSupabaseServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key",
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            if (!isBrowser) {
              cookieStore.set({ name, value, ...options })
            }
          } catch (error) {
            // Handle the error or just ignore it in environments where cookies cannot be set
          }
        },
        remove(name: string, options: any) {
          try {
            if (!isBrowser) {
              cookieStore.set({ name, value: "", ...options })
            }
          } catch (error) {
            // Handle the error or just ignore it
          }
        },
      },
    },
  )
}

export async function createServiceSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key",
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  )
}

export function getCookies() {
  // During build time, return a mock cookie store
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return {
      get: () => ({ value: undefined }),
      set: () => {},
      remove: () => {},
    }
  }

  return isBrowser ? getSafeCookies() : cookies()
}

export const serverSupabase = () => {
  // During build time, return a mock client
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key",
      {
        auth: {
          persistSession: false,
        },
      },
    )
  }

  const cookieStore = isBrowser ? getSafeCookies() : cookies()

  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key",
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            if (!isBrowser) {
              cookieStore.set({ name, value, ...options })
            }
          } catch (error) {
            // Handle the error or just ignore it in environments where cookies cannot be set
          }
        },
        remove(name: string, options: any) {
          try {
            if (!isBrowser) {
              cookieStore.set({ name, value: "", ...options })
            }
          } catch (error) {
            // Handle the error or just ignore it
          }
        },
      },
    },
  )
}

// For backward compatibility
export function getServerSupabase() {
  return createServerSupabaseClient()
}
