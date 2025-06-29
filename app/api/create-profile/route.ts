import { NextResponse } from "next/server"
import { getServiceSupabase } from "@/lib/supabase/server-actions"

export async function POST(request: Request) {
  try {
    const { userId, fullName, email } = await request.json()

    if (!userId || !fullName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await getServiceSupabase()

    const { error } = await supabase.from("profiles").insert({
      id: userId,
      full_name: fullName,
      email: email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Error creating profile:", error)
      return NextResponse.json({ error: "Failed to create profile" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in create-profile API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
