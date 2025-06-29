// Default environment values
export const APP_CONFIG = {
  version: "0.1.0",
  appUrl: "http://localhost:3000",
  errorLoggingEndpoint: "/api/log-error",
}

// Helper to safely get environment variables
export function getEnvVar(name: string, defaultValue: string): string {
  // Try to get from window.__ENV__ first (client-side)
  if (typeof window !== "undefined" && window.__ENV__ && window.__ENV__[name]) {
    return window.__ENV__[name]
  }

  // Try to get from process.env (server-side)
  if (process.env[name]) {
    return process.env[name] as string
  }

  // Fallback to default
  return defaultValue
}
