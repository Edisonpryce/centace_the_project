import { type NextRequest, NextResponse } from "next/server"
import { serverSupabase } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const supabase = serverSupabase()

    // Test 1: Check if the bookings table exists
    const { data: tableExists, error: tableError } = await supabase.from("bookings").select("id").limit(1)

    if (tableError) {
      console.error("Error checking bookings table:", tableError)
      return NextResponse.json(
        {
          error: "Error checking bookings table",
          details: tableError.message,
          hint: "The bookings table might not exist or you don't have permission to access it.",
        },
        { status: 500 },
      )
    }

    // Test 2: Try to insert a test booking
    const testBooking = {
      user_id: userId,
      project_id: "test-project",
      project_name: "Test Project",
      location: "Test Location",
      visit_date: new Date().toISOString().split("T")[0],
      visit_time: "10:00 AM",
      visitors: 1,
      transportation: "own",
      special_requests: "This is a test booking",
      status: "test",
      booking_reference: `TEST-${Date.now()}`,
    }

    const { data: insertResult, error: insertError } = await supabase.from("bookings").insert(testBooking).select()

    // Test 3: Try to delete the test booking if it was inserted
    let deleteResult = null
    let deleteError = null

    if (insertResult && insertResult.length > 0) {
      const { data, error } = await supabase
        .from("bookings")
        .delete()
        .eq("booking_reference", testBooking.booking_reference)
        .select()

      deleteResult = data
      deleteError = error
    }

    return NextResponse.json({
      tableExists: !!tableExists,
      insertTest: {
        success: !insertError,
        error: insertError ? insertError.message : null,
        data: insertResult,
      },
      deleteTest: {
        success: !deleteError,
        error: deleteError ? deleteError.message : null,
        data: deleteResult,
      },
    })
  } catch (error) {
    console.error("Error in test-bookings API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
