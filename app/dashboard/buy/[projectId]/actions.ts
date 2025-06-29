"use server"

import { redirect } from "next/navigation"
import { serverSupabase } from "@/lib/supabase/server"
import { createInvestment } from "@/lib/services/investment-service"
import { createInvestmentNotification } from "@/lib/services/notification-service"

export async function processInvestment(formData: FormData) {
  const supabase = serverSupabase()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const projectId = formData.get("projectId") as string
  const shares = Number.parseInt(formData.get("shares") as string, 10)
  const amount = Number.parseFloat(formData.get("amount") as string)
  const serviceFee = Number.parseFloat(formData.get("serviceFee") as string)
  const totalAmount = Number.parseFloat(formData.get("totalAmount") as string)

  try {
    // Create the investment
    const investment = await createInvestment({
      user_id: session.user.id,
      project_id: projectId,
      shares,
      amount,
      service_fee: serviceFee,
      total_amount: totalAmount,
      status: "completed",
    })

    if (!investment) {
      throw new Error("Failed to create investment")
    }

    // Update project's available shares
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("name, available_shares")
      .eq("id", projectId)
      .single()

    if (projectError) {
      throw new Error("Failed to fetch project")
    }

    const { error: updateError } = await supabase
      .from("projects")
      .update({ available_shares: project.available_shares - shares })
      .eq("id", projectId)

    if (updateError) {
      throw new Error("Failed to update project")
    }

    // Create notification for the investment
    await createInvestmentNotification(session.user.id, project.name, projectId, "purchase")

    // Use redirect to navigate to the portfolio page
    redirect("/dashboard/portfolio")
  } catch (error) {
    console.error("Error processing investment:", error)
    // Instead of returning an error message, throw an error that will be caught by the client
    throw new Error(`Failed to process investment: ${error.message}`)
  }
}
