import { NextResponse } from "next/server"
import { sendTestEmail } from "@/lib/services/email-service"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    const result = await sendTestEmail(email)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message || "Failed to send test email" },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, message: "Test email sent successfully" })
  } catch (error) {
    console.error("Error in test-email API:", error)
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Internal server error" },
      { status: 500 },
    )
  }
}
