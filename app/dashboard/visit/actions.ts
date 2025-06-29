"use server"

import { serverSupabase } from "@/lib/supabase/server"
import { createNotification } from "@/lib/services/notification-service"
import { format } from "date-fns"

export type BookingData = {
  userId: string
  projectId: string
  projectName: string
  location: string
  visitDate: Date
  visitTime: string
  visitors: number
  transportation: string
  specialRequests?: string
}

// Generate a unique booking reference
function generateBookingReference(): string {
  const prefix = "VST"
  const randomNum = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  const timestamp = Date.now().toString().slice(-6)
  return `${prefix}-${randomNum}-${timestamp}`
}

// Create a new booking
export async function createBookingAction(bookingData: BookingData) {
  try {
    const supabase = serverSupabase()

    // Generate a unique booking reference
    const bookingReference = generateBookingReference()

    // Prepare the booking data
    const bookingRecord = {
      user_id: bookingData.userId,
      project_id: bookingData.projectId,
      project_name: bookingData.projectName,
      location: bookingData.location,
      visit_date: bookingData.visitDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      visit_time: bookingData.visitTime,
      visitors: bookingData.visitors,
      transportation: bookingData.transportation,
      special_requests: bookingData.specialRequests || null,
      status: "confirmed",
      booking_reference: bookingReference,
    }

    console.log("Creating booking with data:", JSON.stringify(bookingRecord, null, 2))

    // Insert the booking into the database
    const { data: booking, error } = await supabase.from("bookings").insert(bookingRecord).select("*").single()

    if (error) {
      console.error("Supabase error creating booking:", error)
      return { booking: null, error }
    }

    // Create a notification for the user
    try {
      await createNotification({
        user_id: bookingData.userId,
        title: "Site Visit Booked",
        message: `Your visit to ${bookingData.projectName} on ${format(bookingData.visitDate, "PPP")} at ${bookingData.visitTime} has been confirmed.`,
        type: "visit",
        is_read: false,
        related_id: booking.id,
      })
    } catch (notificationError) {
      console.error("Error creating notification:", notificationError)
      // Continue even if notification fails
    }

    return { booking, error: null }
  } catch (error) {
    console.error("Unexpected error in createBooking:", error)
    return { booking: null, error }
  }
}
