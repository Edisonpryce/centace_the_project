"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client-only"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  error: Error | null
  isUsingMockClient: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  error: null,
  isUsingMockClient: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isUsingMockClient, setIsUsingMockClient] = useState(false)

  // Check if we're using a mock client (environment variables missing)
  useEffect(() => {
    const checkIfMockClient = () => {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        setIsUsingMockClient(true)
      }
    }

    checkIfMockClient()
  }, [])

  useEffect(() => {
    async function getSession() {
      try {
        setIsLoading(true)

        // If we're using a mock client, don't try to get a real session
        if (isUsingMockClient) {
          setSession(null)
          setUser(null)
          setIsLoading(false)
          return
        }

        const { data, error } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        setSession(data.session)
        setUser(data.session?.user || null)
      } catch (error) {
        console.error("Error getting session:", error)
        setError(error instanceof Error ? error : new Error("Failed to get session"))
      } finally {
        setIsLoading(false)
      }
    }

    getSession()

    // Only set up auth state change listener if we're not using a mock client
    if (!isUsingMockClient) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        setUser(session?.user || null)
        setIsLoading(false)
      })

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [isUsingMockClient])

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
    } catch (error) {
      console.error("Error signing in:", error)
      throw error
    }
  }

  // Sign up function
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // First, create the auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) throw error

      // If successful, create a profile record
      if (data.user) {
        // Create profile in the profiles table
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            full_name: fullName,
            email: email,
            created_at: new Date().toISOString(),
          },
        ])

        if (profileError) {
          console.error("Error creating profile:", profileError)
          throw profileError
        }
      }
    } catch (error) {
      console.error("Error signing up:", error)
      throw error
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      // Check if we have an active session before attempting to sign out
      const { data: sessionData } = await supabase.auth.getSession()

      if (!sessionData.session) {
        // If no session exists, just clear the local state
        setUser(null)
        setSession(null)
        return
      }

      // Proceed with sign out if we have a session
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error("Error signing out:", error)
      // Don't rethrow the error, just log it
      // This prevents the error from bubbling up to the UI
    } finally {
      // Always clear the local state regardless of errors
      setUser(null)
      setSession(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, isLoading, error, isUsingMockClient, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
