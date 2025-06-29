// Environment configuration with fallbacks
// This ensures the app works even when environment variables are missing

// App configuration
export const APP_CONFIG = {
  version: process.env.NEXT_PUBLIC_APP_VERSION || "0.1.0",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  errorLoggingEndpoint: process.env.NEXT_PUBLIC_ERROR_LOGGING_ENDPOINT || "/api/log-error",
}

// Email configuration
export const EMAIL_CONFIG = {
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.EMAIL_PORT || "587", 10),
  secure: process.env.EMAIL_SECURE === "true",
  user: process.env.EMAIL_USER || "edisonpryce@gmail.com",
  password: process.env.EMAIL_PASSWORD || "Password@5756",
  from: process.env.EMAIL_FROM || "centaceapp@gmail.com",
}

// Check if required environment variables are available
export function checkRequiredEnvVars(): { missing: string[]; available: string[] } {
  const required = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]

  const optional = [
    "NEXT_PUBLIC_APP_VERSION",
    "NEXT_PUBLIC_APP_URL",
    "NEXT_PUBLIC_ERROR_LOGGING_ENDPOINT",
    "EMAIL_HOST",
    "EMAIL_PORT",
    "EMAIL_SECURE",
    "EMAIL_USER",
    "EMAIL_PASSWORD",
    "EMAIL_FROM",
  ]

  const missing = required.filter((name) => !process.env[name])
  const available = [...required, ...optional].filter((name) => !!process.env[name])

  return { missing, available }
}
