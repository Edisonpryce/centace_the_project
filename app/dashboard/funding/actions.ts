"use server"

import { redirect } from "next/navigation"
import { serverSupabase } from "@/lib/supabase/server"
import { createNotification } from "@/lib/services/notification-service"

export async function processDeposit(formData: FormData) {
  const supabase = serverSupabase()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const amount = Number.parseFloat(formData.get("amount") as string)
  const paymentMethod = formData.get("paymentMethod") as string

  try {
    // Create the transaction
    const { data: transaction, error } = await supabase
      .from("transactions")
      .insert({
        user_id: session.user.id,
        type: "deposit",
        amount,
        status: "completed",
        payment_method: paymentMethod,
        reference: `DEP-${Date.now()}`,
      })
      .select()
      .single()

    if (error) {
      throw new Error("Failed to create transaction")
    }

    // Create a notification for the deposit
    await createNotification({
      user_id: session.user.id,
      title: "Deposit Successful",
      message: `Your deposit of ${amount.toLocaleString("en-US", { style: "currency", currency: "USD" })} has been successfully processed.`,
      type: "transaction",
      is_read: false,
      related_id: transaction.id,
    })

    return { success: true, message: "Deposit successful" }
  } catch (error) {
    console.error("Error processing deposit:", error)
    return { success: false, message: "Failed to process deposit" }
  }
}

export async function processWithdrawal(formData: FormData) {
  const supabase = serverSupabase()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const amount = Number.parseFloat(formData.get("amount") as string)
  const paymentMethod = formData.get("paymentMethod") as string

  try {
    // Create the transaction
    const { data: transaction, error } = await supabase
      .from("transactions")
      .insert({
        user_id: session.user.id,
        type: "withdrawal",
        amount,
        status: "pending",
        payment_method: paymentMethod,
        reference: `WIT-${Date.now()}`,
      })
      .select()
      .single()

    if (error) {
      throw new Error("Failed to create transaction")
    }

    // Create a notification for the withdrawal
    await createNotification({
      user_id: session.user.id,
      title: "Withdrawal Requested",
      message: `Your withdrawal request for ${amount.toLocaleString("en-US", { style: "currency", currency: "USD" })} has been submitted and is pending approval.`,
      type: "transaction",
      is_read: false,
      related_id: transaction.id,
    })

    return { success: true, message: "Withdrawal request submitted" }
  } catch (error) {
    console.error("Error processing withdrawal:", error)
    return { success: false, message: "Failed to process withdrawal" }
  }
}
