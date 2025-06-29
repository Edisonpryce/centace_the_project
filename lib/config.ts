// Environment configuration with fallbacks for preview environments

// App configuration
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || "0.1.0"
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
export const ERROR_LOGGING_ENDPOINT = process.env.NEXT_PUBLIC_ERROR_LOGGING_ENDPOINT || "/api/log-error"

// Supabase configuration - these should already be available in v0.dev
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Email configuration with safe fallbacks for preview
export const EMAIL_CONFIG = {
  host: process.env.EMAIL_HOST || "smtp.example.com",
  port: Number.parseInt(process.env.EMAIL_PORT || "587", 10),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER || "preview@example.com",
    pass: process.env.EMAIL_PASSWORD || "preview-password",
  },
  from: process.env.EMAIL_FROM || "noreply@example.com",
}

// Feature flags for preview environments
export const FEATURES = {
  enableErrorLogging: true,
  enableEmailNotifications: !!process.env.EMAIL_HOST,
  isPreviewEnvironment: !process.env.NEXT_PUBLIC_APP_URL || process.env.NODE_ENV === "development",
}
