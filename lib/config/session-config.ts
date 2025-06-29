// Session configuration
export const SESSION_CONFIG = {
  // Inactivity timeout in milliseconds (10 minutes)
  INACTIVITY_TIMEOUT: 10 * 60 * 1000,

  // Warning time before logout in milliseconds (2 minutes)
  WARNING_TIME: 2 * 60 * 1000,

  // Whether to enable inactivity logout
  ENABLE_INACTIVITY_LOGOUT: true,

  // Whether to show a warning before logout
  SHOW_WARNING: true,

  // Whether to store session data in localStorage
  PERSIST_SESSION: true,

  // Key for storing session data in localStorage
  STORAGE_KEY: "centace_session_data",
}
