import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const errorData = await request.json()

    // Log the error to the console in development
    if (process.env.NODE_ENV !== "production") {
      console.error("[API] Error logged:", errorData)
    }

    // In a real application, you would store this in a database
    // or send it to an error monitoring service

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in log-error API route:", error)
    return NextResponse.json({ success: false, message: "Failed to log error" }, { status: 500 })
  }
}
