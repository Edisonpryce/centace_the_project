import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Check if Supabase credentials are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase credentials are missing, allow access to all routes
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials missing. Allowing access to all routes.")
    return response
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    })

    // Public routes that don't require authentication
    const publicRoutes = ["/", "/login", "/signup", "/terms", "/discover", "/api", "/_next", "/test-connection"]
    const isPublicRoute = publicRoutes.some(
      (route) => request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route + "/"),
    )

    // If it's a public route, skip authentication checks
    if (isPublicRoute) {
      return response
    }

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Protected routes
    const protectedRoutes = ["/dashboard", "/admin"]
    const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

    // Check if user is authenticated for protected routes
    if (isProtectedRoute && !session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Admin routes
    const adminRoutes = ["/admin"]
    const isAdminRoute = adminRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

    // For admin routes, check if user has admin role
    if (isAdminRoute && session) {
      try {
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

        if (!profile || profile.role !== "admin") {
          return NextResponse.redirect(new URL("/dashboard", request.url))
        }
      } catch (error) {
        console.error("Error checking admin role:", error)
        // Fail safe - redirect to dashboard if we can't verify admin status
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }

    return response
  } catch (error) {
    console.error("Middleware error:", error)

    // If there's an error with Supabase, allow access to public routes
    const isPublicPath = ["/", "/login", "/signup", "/terms", "/discover", "/test-connection"].some(
      (path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith("/api/"),
    )

    if (isPublicPath) {
      return response
    }

    // For protected routes, redirect to login if there's an authentication error
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
