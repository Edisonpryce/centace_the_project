import { NextResponse } from "next/server"

export async function GET() {
  const healthCheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
    environment: process.env.NODE_ENV,
    supabaseConfigured: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    version: process.env.NEXT_PUBLIC_APP_VERSION || "0.1.0",
  }

  try {
    return NextResponse.json(healthCheck, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error in health check",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
