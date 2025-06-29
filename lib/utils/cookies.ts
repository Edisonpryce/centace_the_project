// Safe cookie utility that works in both client and server components
export function getCookieValue(name: string): string | undefined {
  if (typeof document !== "undefined") {
    // Client-side
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(";").shift()
    return undefined
  }

  // Server-side - return undefined as we can't access cookies directly
  return undefined
}

export function setCookieValue(name: string, value: string, days = 7): void {
  if (typeof document !== "undefined") {
    // Client-side
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
  }
  // Server-side - no-op
}
