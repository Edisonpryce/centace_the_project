import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { format } from "date-fns"

// Generate a unique booking reference
function generateBookingReference(): string {
  const prefix = "VST"
  const randomNum = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  const timestamp = Date.now().toString().slice(-6)
  return `${prefix}-${randomNum}-${timestamp}`
}

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const bookingData = await request.json()
    console.log("Received booking data:", JSON.stringify(bookingData, null, 2))

    // Validate required fields
    if (
      !bookingData.userId ||
      !bookingData.projectId ||
      !bookingData.projectName ||
      !bookingData.location ||
      !bookingData.visitDate ||
      !bookingData.visitTime ||
      !bookingData.visitors ||
      !bookingData.transportation
    ) {
      console.error("Missing required fields:", {
        userId: !bookingData.userId,
        projectId: !bookingData.projectId,
        projectName: !bookingData.projectName,
        location: !bookingData.location,
        visitDate: !bookingData.visitDate,
        visitTime: !bookingData.visitTime,
        visitors: !bookingData.visitors,
        transportation: !bookingData.transportation,
      })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create Supabase client with service role for admin access
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Generate booking reference
    const bookingReference = generateBookingReference()

    // Format date properly
    let visitDate
    try {
      visitDate = new Date(bookingData.visitDate)
      if (isNaN(visitDate.getTime())) {
        throw new Error("Invalid date")
      }
    } catch (error) {
      console.error("Invalid date format:", bookingData.visitDate, error)
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 })
    }

    const formattedDate = visitDate.toISOString().split("T")[0]

    // Prepare booking record
    const bookingRecord = {
      user_id: bookingData.userId,
      project_id: bookingData.projectId,
      project_name: bookingData.projectName,
      location: bookingData.location,
      visit_date: formattedDate,
      visit_time: bookingData.visitTime,
      visitors: Number(bookingData.visitors),
      transportation: bookingData.transportation,
      special_requests: bookingData.specialRequests || null,
      status: "confirmed",
      booking_reference: bookingReference,
    }

    console.log("Creating booking with data:", JSON.stringify(bookingRecord, null, 2))

    // First, check if the bookings table exists
    const { data: tableExists, error: tableCheckError } = await supabase.from("bookings").select("id").limit(1)

    if (tableCheckError) {
      console.error("Error checking bookings table:", tableCheckError)

      // If the table doesn't exist, try to create it
      if (tableCheckError.message.includes("relation") && tableCheckError.message.includes("does not exist")) {
        console.log("Bookings table doesn't exist, attempting to create it")

        // Execute the SQL to create the table
        const { error: createTableError } = await supabase.rpc("execute_sql", {
          sql: `
            CREATE TABLE IF NOT EXISTS bookings (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              user_id UUID NOT NULL,
              project_id TEXT NOT NULL,
              project_name TEXT NOT NULL,
              location TEXT NOT NULL,
              visit_date DATE NOT NULL,
              visit_time TEXT NOT NULL,
              visitors INTEGER NOT NULL,
              transportation TEXT NOT NULL,
              special_requests TEXT,
              status TEXT NOT NULL DEFAULT 'pending',
              booking_reference TEXT NOT NULL,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
          `,
        })

        if (createTableError) {
          console.error("Error creating bookings table:", createTableError)
          return NextResponse.json(
            {
              error: "Failed to create bookings table",
              details: createTableError.message,
            },
            { status: 500 },
          )
        }

        console.log("Successfully created bookings table")
      } else {
        return NextResponse.json(
          {
            error: "Error checking bookings table",
            details: tableCheckError.message,
          },
          { status: 500 },
        )
      }
    }

    // Insert booking
    const { data: booking, error: insertError } = await supabase
      .from("bookings")
      .insert(bookingRecord)
      .select("*")
      .single()

    if (insertError) {
      console.error("Supabase error creating booking:", insertError)
      return NextResponse.json(
        {
          error: "Failed to create booking",
          details: insertError.message,
          code: insertError.code,
        },
        { status: 500 },
      )
    }

    if (!booking) {
      console.error("No booking returned after insert")
      return NextResponse.json({ error: "No booking data returned" }, { status: 500 })
    }

    console.log("Booking created successfully:", booking.id)

    // Create notification
    try {
      const { error: notificationError } = await supabase.from("notifications").insert({
        user_id: bookingData.userId,
        title: "Site Visit Booked",
        message: `Your visit to ${bookingData.projectName} on ${format(visitDate, "PPP")} at ${bookingData.visitTime} has been confirmed.`,
        type: "visit",
        is_read: false,
        related_id: booking.id,
      })

      if (notificationError) {
        console.error("Error creating notification:", notificationError)
        // Continue even if notification fails
      }
    } catch (notificationError) {
      console.error("Exception creating notification:", notificationError)
      // Continue even if notification fails
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error("Unhandled error in booking API:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
