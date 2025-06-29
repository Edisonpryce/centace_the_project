"use server"

import { serverSupabase } from "@/lib/supabase/server"
import type { Booking } from "@/lib/types/database"

// Get user bookings
export async function getUserBookings(userId: string): Promise<Booking[]> {
  try {
    const supabase = serverSupabase()

    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", userId)
      .order("visit_date", { ascending: true })

    if (error) {
      console.error("Error fetching user bookings:", error)
      return []
    }

    return bookings || []
  } catch (error) {
    console.error("Error in getUserBookings:", error)
    return []
  }
}

// Get all bookings (for admin)
export async function getAllBookings(): Promise<Booking[]> {
  try {
    const supabase = serverSupabase()

    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("*, profiles(full_name, email)")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching all bookings:", error)
      return []
    }

    return bookings || []
  } catch (error) {
    console.error("Error in getAllBookings:", error)
    return []
  }
}

// Update booking status (for admin)
export async function updateBookingStatus(
  bookingId: string,
  status: "pending" | "approved" | "rejected" | "cancelled" | "completed",
): Promise<boolean> {
  try {
    const supabase = serverSupabase()

    const { error } = await supabase
      .from("bookings")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", bookingId)

    if (error) {
      console.error(`Error updating booking status for ID ${bookingId}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Error in updateBookingStatus for ID ${bookingId}:`, error)
    return false
  }
}

// Cancel booking
export async function cancelBooking(bookingId: string, userId: string): Promise<boolean> {
  try {
    const supabase = serverSupabase()

    const { error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", bookingId)
      .eq("user_id", userId)

    if (error) {
      console.error(`Error cancelling booking with ID ${bookingId}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Error in cancelBooking for ID ${bookingId}:`, error)
    return false
  }
}
