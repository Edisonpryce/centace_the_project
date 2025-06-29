// Default values that work with our Supabase setup
export const errorConfig = {
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION || "0.1.0",
  loggingEndpoint: process.env.NEXT_PUBLIC_ERROR_LOGGING_ENDPOINT || "/api/log-error",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
}

// Email configuration is handled server-side only
export const getEmailConfig = () => ({
  host: process.env.EMAIL_HOST || "smtp.example.com",
  port: Number(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER || "user@example.com",
    pass: process.env.EMAIL_PASSWORD || "password",
  },
  from: process.env.EMAIL_FROM || "noreply@centace.com",
})
