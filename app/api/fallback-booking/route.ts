import { type NextRequest, NextResponse } from "next/server"

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
    const bookingData = await request.json()

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
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

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
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 })
    }

    // Create a mock booking object
    const booking = {
      id: crypto.randomUUID(),
      user_id: bookingData.userId,
      project_id: bookingData.projectId,
      project_name: bookingData.projectName,
      location: bookingData.location,
      visit_date: visitDate.toISOString().split("T")[0],
      visit_time: bookingData.visitTime,
      visitors: Number(bookingData.visitors),
      transportation: bookingData.transportation,
      special_requests: bookingData.specialRequests || null,
      status: "confirmed",
      booking_reference: bookingReference,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error("Error in fallback booking API:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
