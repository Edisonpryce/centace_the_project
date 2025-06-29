import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    // Check Supabase connection
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("profiles").select("count").limit(1)

    if (error) {
      throw new Error(`Supabase error: ${error.message}`)
    }

    // Check environment variables
    const envCheck = {
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      emailHost: !!process.env.EMAIL_HOST,
      appUrl: !!process.env.NEXT_PUBLIC_APP_URL,
      appVersion: process.env.NEXT_PUBLIC_APP_VERSION || "0.1.0",
    }

    // Return success response
    return NextResponse.json({
      status: "success",
      message: "Deployment verification successful",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      databaseConnected: true,
      environmentVariables: envCheck,
    })
  } catch (error) {
    console.error("Deployment verification failed:", error)

    // Return error response
    return NextResponse.json(
      {
        status: "error",
        message: "Deployment verification failed",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      },
      { status: 500 },
    )
  }
}
