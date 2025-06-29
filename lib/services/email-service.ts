"use server"

import nodemailer from "nodemailer"
import { serverSupabase } from "@/lib/supabase/server"
import type { Notification } from "@/lib/types/database"

// Configure email transporter
// In production, you would use a service like SendGrid, Mailgun, etc.
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER || "edisonpryce@gmail.com",
    pass: process.env.EMAIL_PASSWORD || "Password@5756",
  },
})

// Email templates for different notification types
const emailTemplates = {
  welcome: {
    subject: "Welcome to Centace Investment Platform",
    getHtml: (notification: Notification) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #0066cc;">Welcome to Centace</h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
          <h2 style="color: #0066cc; margin-top: 0;">${notification.title}</h2>
          <p>${notification.message}</p>
          <div style="margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Explore Projects</a>
          </div>
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
          <p>© ${new Date().getFullYear()} Centace Investment Platform. All rights reserved.</p>
        </div>
      </div>
    `,
  },
  investment: {
    subject: "Investment Confirmation",
    getHtml: (notification: Notification) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #0066cc;">Centace Investment Platform</h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
          <h2 style="color: #0066cc; margin-top: 0;">${notification.title}</h2>
          <p>${notification.message}</p>
          <div style="margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/portfolio" style="background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View Portfolio</a>
          </div>
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
          <p>© ${new Date().getFullYear()} Centace Investment Platform. All rights reserved.</p>
        </div>
      </div>
    `,
  },
  update: {
    subject: "Investment Update",
    getHtml: (notification: Notification) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #0066cc;">Centace Investment Platform</h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
          <h2 style="color: #0066cc; margin-top: 0;">${notification.title}</h2>
          <p>${notification.message}</p>
          <div style="margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/portfolio" style="background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View Details</a>
          </div>
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
          <p>© ${new Date().getFullYear()} Centace Investment Platform. All rights reserved.</p>
        </div>
      </div>
    `,
  },
  return: {
    subject: "Investment Return Distributed",
    getHtml: (notification: Notification) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #0066cc;">Centace Investment Platform</h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
          <h2 style="color: #0066cc; margin-top: 0;">${notification.title}</h2>
          <p>${notification.message}</p>
          <div style="margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/portfolio" style="background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View Portfolio</a>
          </div>
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
          <p>© ${new Date().getFullYear()} Centace Investment Platform. All rights reserved.</p>
        </div>
      </div>
    `,
  },
  transaction: {
    subject: "Transaction Update",
    getHtml: (notification: Notification) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #0066cc;">Centace Investment Platform</h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
          <h2 style="color: #0066cc; margin-top: 0;">${notification.title}</h2>
          <p>${notification.message}</p>
          <div style="margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/funding" style="background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View Transactions</a>
          </div>
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
          <p>© ${new Date().getFullYear()} Centace Investment Platform. All rights reserved.</p>
        </div>
      </div>
    `,
  },
  new: {
    subject: "New Project Available",
    getHtml: (notification: Notification) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #0066cc;">Centace Investment Platform</h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
          <h2 style="color: #0066cc; margin-top: 0;">${notification.title}</h2>
          <p>${notification.message}</p>
          <div style="margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/discover" style="background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Explore New Projects</a>
          </div>
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
          <p>© ${new Date().getFullYear()} Centace Investment Platform. All rights reserved.</p>
        </div>
      </div>
    `,
  },
  visit: {
    subject: "Site Visit Confirmation",
    getHtml: (notification: Notification) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #0066cc;">Centace Investment Platform</h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
          <h2 style="color: #0066cc; margin-top: 0;">${notification.title}</h2>
          <p>${notification.message}</p>
          <div style="margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/visit" style="background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Manage Your Visits</a>
          </div>
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
          <p>© ${new Date().getFullYear()} Centace Investment Platform. All rights reserved.</p>
        </div>
      </div>
    `,
  },
  // Default template for any other notification types
  default: {
    subject: "Notification from Centace",
    getHtml: (notification: Notification) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #0066cc;">Centace Investment Platform</h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
          <h2 style="color: #0066cc; margin-top: 0;">${notification.title}</h2>
          <p>${notification.message}</p>
          <div style="margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Go to Dashboard</a>
          </div>
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
          <p>© ${new Date().getFullYear()} Centace Investment Platform. All rights reserved.</p>
        </div>
      </div>
    `,
  },
}

// Default email preferences for all notification types
const DEFAULT_EMAIL_PREFERENCES = {
  welcome: true,
  investment: true,
  update: true,
  return: true,
  transaction: true,
  new: true,
  marketing: false,
  visit: true,
}

// Function to send email notification
export async function sendEmailNotification(notification: Notification): Promise<boolean> {
  try {
    // Get user email from profiles table
    const supabase = serverSupabase()
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", notification.user_id)
      .single()

    if (profileError || !profile || !profile.email) {
      console.error("Error fetching user profile:", profileError)
      return false
    }

    // Check if email_preferences column exists
    const { data: columnExists, error: columnError } = await supabase
      .from("information_schema.columns")
      .select("column_name")
      .eq("table_schema", "public")
      .eq("table_name", "profiles")
      .eq("column_name", "email_preferences")
      .single()

    // Use default preferences if column doesn't exist
    let emailPreferences = DEFAULT_EMAIL_PREFERENCES

    // If column exists, try to get user preferences
    if (columnExists && !columnError) {
      const { data: userProfile, error: userProfileError } = await supabase
        .from("profiles")
        .select("email_preferences")
        .eq("id", notification.user_id)
        .single()

      if (!userProfileError && userProfile && userProfile.email_preferences) {
        emailPreferences = {
          ...DEFAULT_EMAIL_PREFERENCES,
          ...userProfile.email_preferences,
        }
      }
    }

    // Check if user has opted out of this type of email notification
    if (emailPreferences[notification.type] === false) {
      console.log(`User has opted out of ${notification.type} email notifications`)
      return false
    }

    // Get the appropriate email template
    const template = emailTemplates[notification.type as keyof typeof emailTemplates] || emailTemplates.default

    // Send the email
    await transporter.sendMail({
      from: `"Centace Investment Platform" <${process.env.EMAIL_FROM || "centaceapp@gmail.com"}>`,
      to: profile.email,
      subject: template.subject,
      html: template.getHtml(notification),
    })

    return true
  } catch (error) {
    console.error("Error sending email notification:", error)
    return false
  }
}

// Function to send a test email
export async function sendTestEmail(email: string): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: `"Centace Investment Platform" <${process.env.EMAIL_FROM || "centaceapp@gmail.com"}>`,
      to: email,
      subject: "Test Email from Centace",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #0066cc;">Centace Investment Platform</h1>
          </div>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
            <h2 style="color: #0066cc; margin-top: 0;">Test Email</h2>
            <p>This is a test email from Centace Investment Platform. If you received this email, your email notifications are working correctly.</p>
          </div>
          <div style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
            <p>© ${new Date().getFullYear()} Centace Investment Platform. All rights reserved.</p>
          </div>
        </div>
      `,
    })

    return true
  } catch (error) {
    console.error("Error sending test email:", error)
    return false
  }
}
