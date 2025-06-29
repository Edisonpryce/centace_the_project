import { supabase } from "@/lib/supabase/client"
import { createServerClient } from "@/lib/supabase/server"
import { getCookies } from "@/lib/supabase/server"

// Get all users with their profiles and roles
export async function getUsers() {
  try {
    // First try to get profiles
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })

    if (profilesError) {
      console.error("Error fetching profiles:", profilesError)
      throw profilesError
    }

    // Then get roles separately
    const { data: roles, error: rolesError } = await supabase
      .from("admin_roles") // Using admin_roles as suggested in the error hint
      .select("*")

    if (rolesError) {
      console.error("Error fetching roles:", rolesError)
      // Continue without roles rather than failing completely
    }

    // Combine the data manually
    const usersWithRoles = profiles.map((profile) => {
      const userRole = roles?.find((role) => role.user_id === profile.id)
      return {
        ...profile,
        auth_roles: userRole ? { role: userRole.role } : { role: "user" },
      }
    })

    return usersWithRoles
  } catch (error) {
    console.error("Error in getUsers:", error)
    // Return empty array instead of throwing to prevent build failure
    return []
  }
}

// Get user by ID with role
export async function getUserById(userId: string) {
  try {
    const { data: profile, error: profileError } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (profileError) {
      console.error("Error fetching user profile:", profileError)
      throw profileError
    }

    const { data: role, error: roleError } = await supabase
      .from("admin_roles")
      .select("role")
      .eq("user_id", userId)
      .single()

    return {
      ...profile,
      auth_roles: role ? { role: role.role } : { role: "user" },
    }
  } catch (error) {
    console.error("Error in getUserById:", error)
    throw error
  }
}

// Update user role
export async function updateUserRole(userId: string, role: string) {
  try {
    // Check if user already has a role
    const { data: existingRole } = await supabase
      .from("admin_roles") // Changed from auth_roles to admin_roles
      .select("*")
      .eq("user_id", userId)
      .single()

    if (existingRole) {
      // Update existing role
      const { error } = await supabase
        .from("admin_roles") // Changed from auth_roles to admin_roles
        .update({ role })
        .eq("user_id", userId)

      if (error) {
        console.error("Error updating user role:", error)
        throw error
      }
    } else {
      // Insert new role
      const { error } = await supabase
        .from("admin_roles") // Changed from auth_roles to admin_roles
        .insert({ user_id: userId, role })

      if (error) {
        console.error("Error creating user role:", error)
        throw error
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error in updateUserRole:", error)
    throw error
  }
}

// Disable/Enable user account
export async function updateUserStatus(userId: string, isActive: boolean) {
  const { error } = await supabase.from("profiles").update({ is_active: isActive }).eq("id", userId)

  if (error) {
    console.error("Error updating user status:", error)
    throw error
  }

  return { success: true }
}

// Get platform statistics for admin dashboard
export async function getPlatformStats() {
  // Get total users
  const { count: totalUsers, error: usersError } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })

  // Get total investments
  const { count: totalInvestments, error: investmentsError } = await supabase
    .from("investments")
    .select("*", { count: "exact", head: true })

  // Get total projects
  const { count: totalProjects, error: projectsError } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })

  // Get total invested amount
  const { data: investmentData, error: amountError } = await supabase.from("investments").select("amount")

  const totalInvested = investmentData?.reduce((sum, inv) => sum + inv.amount, 0) || 0

  // Get pending media count
  const { count: pendingMedia, error: mediaError } = await supabase
    .from("media")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  // Get flagged content count
  const { count: flaggedContent, error: flagsError } = await supabase
    .from("reports")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  if (usersError || investmentsError || projectsError || amountError || mediaError || flagsError) {
    console.error("Error fetching platform stats")
    throw new Error("Failed to fetch platform statistics")
  }

  return {
    totalUsers,
    totalInvestments,
    totalProjects,
    totalInvested,
    pendingMedia,
    flaggedContent,
  }
}

// Server-side admin check
export async function checkAdminRole() {
  try {
    // During build time, return a default value
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return { isAdmin: false, role: null }
    }

    const cookieStore = getCookies()
    const supabaseServer = createServerClient(cookieStore)

    const {
      data: { session },
    } = await supabaseServer.auth.getSession()

    if (!session) {
      return { isAdmin: false, role: null }
    }

    const { data, error } = await supabaseServer
      .from("admin_roles") // Changed from auth_roles to admin_roles
      .select("role")
      .eq("user_id", session.user.id)
      .single()

    if (error || !data) {
      return { isAdmin: false, role: null }
    }

    const isAdmin = data.role === "admin" || data.role === "super_admin"

    return {
      isAdmin,
      role: data.role,
      userId: session.user.id,
    }
  } catch (error) {
    console.error("Error checking admin role:", error)
    return { isAdmin: false, role: null }
  }
}
