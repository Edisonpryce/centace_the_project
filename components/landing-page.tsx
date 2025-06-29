"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ArrowUpRight, Loader2, RefreshCw, AlertTriangle, X } from "lucide-react"
import Link from "next/link"
import { getProjects } from "@/lib/services/project-service"
import { supabase } from "@/lib/supabase/client-only"
import { useTheme } from "@/components/theme-provider"
import { getActiveAnnouncements } from "@/lib/services/announcement-service"
import { formatCurrency } from "@/lib/utils"
import { LanguageCurrencyDropdown } from "@/components/language-currency-dropdown"
import { ThemeToggle } from "@/components/theme-toggle"
import { Skeleton } from "@/components/ui/skeleton"
import { useErrorContext } from "@/components/providers/error-provider"
import { showErrorToast } from "@/components/ui/error-toast"
import { AppError } from "@/lib/errors/app-error"

export default function LandingPage() {
  const { theme } = useTheme()
  const { captureError } = useErrorContext()
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [currentBusinessSector, setCurrentBusinessSector] = useState(0)
  const [investorCount, setInvestorCount] = useState<number | null>(null)
  const [activeProjects, setActiveProjects] = useState<number | null>(null)
  const [totalFunds, setTotalFunds] = useState<number | null>(null)
  const [avgReturns, setAvgReturns] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [isProjectsLoading, setIsProjectsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [loadingStates, setLoadingStates] = useState({
    googleSignIn: false,
    appleSignIn: false,
    register: false,
  })
  const [announcementsError, setAnnouncementsError] = useState<string | null>(null)
  const [projectsError, setProjectsError] = useState<boolean>(false)
  const [isAnnouncementsLoading, setIsAnnouncementsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [projects, setProjects] = useState<any[]>([])
  const [projectStats, setProjectStats] = useState({
    totalTarget: 0,
    totalRaised: 0,
    activeCount: 0,
    pendingCount: 0,
    completedCount: 0,
  })

  // Business sectors to display in animation
  const businessSectors = [
    "Agriculture & Agribusiness",
    "Industrialization & Production",
    "Services",
    "Technology & Digital Economy",
    "Transportation & Logistics",
    "Entertainment & Media",
    "Real Estate & Construction",
  ]

  // Animation for Projects of Interest items
  useEffect(() => {
    const animationItems = document.querySelectorAll('[style*="--animation-state"]')
    let animationState = 0

    const animationInterval = setInterval(() => {
      animationState = animationState === 0 ? 1 : 0

      animationItems.forEach((item) => {
        ;(item as HTMLElement).style.setProperty("--animation-state", animationState.toString())
      })
    }, 3000)

    return () => clearInterval(animationInterval)
  }, [])

  // Animation for cycling through business sectors
  useEffect(() => {
    const sectorInterval = setInterval(() => {
      setCurrentBusinessSector((prev) => (prev + 1) % businessSectors.length)
    }, 2000) // Change every 2 seconds

    return () => clearInterval(sectorInterval)
  }, [])

  // Fetch real-time investment data
  useEffect(() => {
    let isMounted = true
    const fetchInvestmentData = async () => {
      if (!isMounted) return
      setIsLoading(true)
      try {
        // Get active projects count - use fallback if fetch fails
        try {
          const projects = await getProjects()
          if (!isMounted) return
          setActiveProjects(projects.length)
        } catch (error) {
          console.warn("Error fetching projects for count:", error)
          setActiveProjects(0)
        }

        // Get investor count (users who have made investments)
        try {
          const { count: investorCount, error: investorError } = await supabase
            .from("investments")
            .select("user_id", { count: "exact", head: true })
            .eq("status", "active")

          if (!isMounted) return
          if (investorError) {
            console.warn("Error fetching investor count:", investorError)
            setInvestorCount(0)
          } else {
            setInvestorCount(investorCount || 0)
          }
        } catch (error) {
          if (!isMounted) return
          console.warn("Error in investments query:", error)
          setInvestorCount(0)
        }

        // Get total funds invested
        try {
          const { data: totalInvestments, error: investmentsError } = await supabase
            .from("investments")
            .select("amount")
            .eq("status", "active")

          if (!isMounted) return
          if (investmentsError) {
            console.warn("Error fetching total investments:", investmentsError)
            setTotalFunds(0)
          } else {
            const total = totalInvestments?.reduce((sum, investment) => sum + (investment.amount || 0), 0) || 0
            setTotalFunds(total)
          }
        } catch (error) {
          if (!isMounted) return
          console.warn("Error in total funds query:", error)
          setTotalFunds(0)
        }

        // Get average returns - Handle case when table doesn't exist
        try {
          const { data: returnsData, error: returnsError } = await supabase
            .from("project_returns")
            .select("return_percentage")

          if (!isMounted) return
          if (returnsError) {
            // Check if the error is about the missing table
            if (returnsError.message.includes("does not exist")) {
              console.warn("project_returns table does not exist, using fallback data")
              // Use fallback data
              setAvgReturns(12.5) // Example fallback value
            } else {
              console.warn("Error fetching returns data:", returnsError)
              setAvgReturns(0)
            }
          } else {
            const avgReturn = returnsData?.length
              ? returnsData.reduce((sum, item) => sum + (item.return_percentage || 0), 0) / returnsData.length
              : 0
            setAvgReturns(avgReturn)
          }
        } catch (error) {
          if (!isMounted) return
          console.warn("Error in returns query:", error)
          setAvgReturns(0)
        }
      } catch (error) {
        if (!isMounted) return
        captureError(error, true)
        // Set fallback values in case of error
        setInvestorCount(0)
        setActiveProjects(0)
        setTotalFunds(0)
        setAvgReturns(0)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchInvestmentData()

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false
    }
  }, []) // Empty dependency array to run only once on mount

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setIsAnnouncementsLoading(true)
      try {
        const data = await getActiveAnnouncements()
        setAnnouncements(data)
        setAnnouncementsError(null)
      } catch (error) {
        console.error("Error fetching announcements:", error)
        setAnnouncementsError("Unable to load announcements. Please try again later.")
        setAnnouncements([])
      } finally {
        setIsAnnouncementsLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  // Fetch projects data with real-time updates
  useEffect(() => {
    let isMounted = true
    const projectsSubscription: any = null

    const fetchProjects = async () => {
      if (!isMounted) return
      setIsProjectsLoading(true)
      setProjectsError(false)
      try {
        // Get projects
        const allProjects = await getProjects()
        if (!isMounted) return
        setProjects(allProjects)

        // Calculate stats
        const totalTarget = allProjects.reduce(
          (sum, project) => sum + project.price_per_share * project.total_shares,
          0,
        )
        const totalRaised = allProjects.reduce(
          (sum, project) => sum + project.price_per_share * (project.total_shares - project.available_shares),
          0,
        )

        const activeCount = allProjects.filter((p) => p.status === "active").length
        const pendingCount = allProjects.filter((p) => p.status === "pending").length
        const completedCount = allProjects.filter((p) => p.status === "completed").length

        if (!isMounted) return
        setProjectStats({
          totalTarget,
          totalRaised,
          activeCount,
          pendingCount,
          completedCount,
        })
      } catch (error) {
        if (!isMounted) return
        console.error("Error fetching projects:", error)
        setProjectsError(true)

        // Show a toast notification for the error
        const appError = AppError.fromError(error)
        showErrorToast(
          appError,
          <Button size="sm" variant="outline" onClick={handleRefresh}>
            Retry
          </Button>,
        )

        // Set empty defaults
        setProjects([])
        setProjectStats({
          totalTarget: 0,
          totalRaised: 0,
          activeCount: 0,
          pendingCount: 0,
          completedCount: 0,
        })
      } finally {
        if (isMounted) {
          setIsProjectsLoading(false)
        }
      }
    }

    // Initial fetch
    fetchProjects()

    // Use a more reasonable polling interval (2 minutes instead of 30 seconds)
    const pollingInterval = setInterval(() => {
      if (isMounted) {
        fetchProjects()
      }
    }, 120000) // 2 minutes

    // Don't set up real-time subscription for now to reduce potential errors
    // Or set it up conditionally if needed

    return () => {
      isMounted = false
      if (projectsSubscription) {
        try {
          projectsSubscription.unsubscribe()
        } catch (error) {
          console.warn("Error unsubscribing from channel:", error)
        }
      }
      clearInterval(pollingInterval)
    }
  }, []) // Empty dependency array to run only once on mount

  const handleRefresh = async () => {
    setIsRefreshing(true)
    setProjectsError(false)
    try {
      const allProjects = await getProjects()
      setProjects(allProjects)

      // Calculate stats
      const totalTarget = allProjects.reduce((sum, project) => sum + project.price_per_share * project.total_shares, 0)
      const totalRaised = allProjects.reduce(
        (sum, project) => sum + project.price_per_share * (project.total_shares - project.available_shares),
        0,
      )

      const activeCount = allProjects.filter((p) => p.status === "active").length
      const pendingCount = allProjects.filter((p) => p.status === "pending").length
      const completedCount = allProjects.filter((p) => p.status === "completed").length

      setProjectStats({
        totalTarget,
        totalRaised,
        activeCount,
        pendingCount,
        completedCount,
      })
    } catch (error) {
      console.error("Error refreshing data:", error)
      setProjectsError(true)
      // Show a toast notification for the error
      const appError = AppError.fromError(error)
      showErrorToast(appError)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleSignIn = async (provider: "google" | "apple") => {
    setLoadingStates((prev) => ({ ...prev, [provider === "google" ? "googleSignIn" : "appleSignIn"]: true }))
    try {
      window.location.href = `/api/auth/${provider}`
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error)
    }
    // Note: We don't set loading to false here because we're redirecting
  }

  const handleRegister = () => {
    setLoadingStates((prev) => ({ ...prev, register: true }))
  }

  // Theme-based style variables
  const themeStyles = {
    background: theme === "dark" ? "bg-[#0a0a0f]" : "bg-[#f8fafc]",
    backgroundSecondary: theme === "dark" ? "bg-[#0d1117]" : "bg-white",
    backgroundTertiary: theme === "dark" ? "bg-[#161b22]" : "bg-white",
    backgroundCard: theme === "dark" ? "bg-[#1a1d24]" : "bg-white",
    text: theme === "dark" ? "text-white" : "text-gray-900",
    textSecondary: theme === "dark" ? "text-gray-300" : "text-gray-600",
    textTertiary: theme === "dark" ? "text-gray-400" : "text-gray-500",
    border: theme === "dark" ? "border-gray-800" : "border-gray-200",
    borderSecondary: theme === "dark" ? "border-gray-700" : "border-gray-300",
    hover: theme === "dark" ? "hover:bg-[#21262d]" : "hover:bg-gray-50",
    activeNav: theme === "dark" ? "bg-[#21262d]" : "bg-blue-50 text-blue-600",
    shadow: theme === "dark" ? "shadow-[0_4px_12px_rgba(0,0,0,0.3)]" : "shadow-[0_4px_12px_rgba(0,0,0,0.05)]",
    accent: theme === "dark" ? "text-blue-400" : "text-blue-600",
    accentBg: theme === "dark" ? "bg-blue-900/20" : "bg-blue-50",
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element).closest("header")) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mobileMenuOpen])

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
      {/* Navigation Bar */}
      <header className="border-b border-gray-200 dark:border-gray-800 px-4 py-3 bg-white dark:bg-[#0d1117] sticky top-0 z-50">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation - Left side */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold mr-2">
                C
              </div>
              <span className="font-medium">Centace</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/discover"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                Project Discovery
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-white dark:hover:text-white light:hover:text-black"
              >
                Portfolio Tracking
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-white dark:hover:text-white light:hover:text-black"
              >
                Returns Distribution
              </Link>
            </nav>
          </div>

          {/* Desktop Controls - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="w-64 bg-gray-100 dark:bg-[#161b22] border-gray-300 dark:border-gray-700 pl-8 text-sm rounded-md"
                placeholder="Search..."
              />
            </div>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-gray-300 dark:text-gray-300 light:text-gray-700">
                Login
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button
                size="sm"
                className="bg-white dark:bg-white light:bg-black text-black dark:text-black light:text-white hover:bg-gray-200 dark:hover:bg-gray-200 light:hover:bg-gray-800"
                onClick={handleRegister}
                disabled={loadingStates.register}
              >
                {loadingStates.register ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </Link>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
            <LanguageCurrencyDropdown isDark={true} />
            <ThemeToggle className="text-gray-300" />
          </div>

          {/* Mobile Hamburger Menu - Only visible on mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white dark:bg-[#0d1117] border-b border-gray-200 dark:border-gray-800 shadow-lg z-40">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="w-full bg-gray-100 dark:bg-[#161b22] border-gray-300 dark:border-gray-700 pl-10 text-sm rounded-md"
                  placeholder="Search..."
                />
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                <Link
                  href="/discover"
                  className="block text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Project Discovery
                </Link>
                <Link
                  href="#"
                  className="block text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Portfolio Tracking
                </Link>
                <Link
                  href="#"
                  className="block text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Returns Distribution
                </Link>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link href="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full text-gray-700 dark:text-gray-300">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                    onClick={handleRegister}
                    disabled={loadingStates.register}
                  >
                    {loadingStates.register ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                </Link>
              </div>

              {/* Mobile Theme and Language Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Settings</span>
                <div className="flex items-center space-x-3">
                  <LanguageCurrencyDropdown isDark={true} />
                  <ThemeToggle className="text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold">
                  Real World <br />
                  Investments:
                </h1>
                <h2 className="text-4xl font-bold text-yellow-400 h-12 overflow-hidden">
                  {businessSectors.map((sector, index) => (
                    <div
                      key={index}
                      className="transition-all duration-500"
                      style={{
                        opacity: currentBusinessSector === index ? 1 : 0,
                        transform: `translateY(${(index - currentBusinessSector) * 100}%)`,
                        position: "absolute",
                      }}
                    >
                      {sector}
                    </div>
                  ))}
                </h2>
              </div>
              <div className="space-y-4 flex flex-col items-center">
                <Link href="/signup" passHref>
                  <Button
                    className="bg-[#161b22] dark:bg-[#161b22] light:bg-gray-200 hover:bg-[#21262d] dark:hover:bg-[#21262d] light:hover:bg-gray-300 text-white dark:text-white light:text-black"
                    onClick={handleRegister}
                    disabled={loadingStates.register}
                  >
                    {loadingStates.register ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Register Now"
                    )}
                  </Button>
                </Link>
                <div className="flex space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 p-0 relative"
                    onClick={() => handleSignIn("google")}
                    disabled={loadingStates.googleSignIn}
                    aria-label="Sign in with Google"
                  >
                    {loadingStates.googleSignIn ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 p-0 relative"
                    onClick={() => handleSignIn("apple")}
                    disabled={loadingStates.appleSignIn}
                    aria-label="Sign in with Apple"
                  >
                    {loadingStates.appleSignIn ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z" />
                        <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
                      </svg>
                    )}
                  </Button>
                </div>
                <div className="text-xs text-gray-400 mt-1">Sign up with social providers</div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Tabs Section */}
            <div>
              <Tabs defaultValue="popular" className="w-full">
                <TabsList className="bg-gray-100 dark:bg-[#161b22] w-full justify-start">
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="target">Target</TabsTrigger>
                  <TabsTrigger value="raised">Raised</TabsTrigger>
                  <TabsTrigger value="status">Status</TabsTrigger>
                </TabsList>

                {/* Popular Projects Tab */}
                <TabsContent value="popular" className="bg-gray-100 dark:bg-[#161b22] rounded-b-lg p-4">
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {isProjectsLoading ? (
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 bg-white dark:bg-[#0d1117] rounded-lg"
                          >
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-32" />
                              <Skeleton className="h-3 w-24" />
                            </div>
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-16" />
                              <Skeleton className="h-3 w-12" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : projectsError ? (
                      <div className="text-center py-4 text-amber-500">
                        <div className="flex flex-col items-center space-y-2">
                          <AlertTriangle className="h-8 w-8" />
                          <p>Unable to load projects</p>
                          <Button size="sm" variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                            {isRefreshing ? (
                              <>
                                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                Retrying...
                              </>
                            ) : (
                              <>
                                <RefreshCw className="mr-2 h-3 w-3" />
                                Retry
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ) : projects.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">No projects available</div>
                    ) : (
                      projects.slice(0, 3).map((project) => (
                        <div
                          key={project.id}
                          className="flex items-center justify-between p-3 bg-white dark:bg-[#0d1117] rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{project.name}</h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {project.category} • {project.location}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-sm font-medium text-green-400">
                              {formatCurrency(project.price_per_share)}/share
                            </span>
                            <Link
                              href="/discover"
                              className="flex items-center text-xs text-cyan-400 hover:text-cyan-300 mt-1"
                            >
                              View All <ArrowUpRight className="ml-1 h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      className="text-xs"
                    >
                      {isRefreshing ? (
                        <>
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          Refreshing...
                        </>
                      ) : (
                        "Refresh Data"
                      )}
                    </Button>
                  </div>
                </TabsContent>

                {/* Target Tab */}
                <TabsContent value="target" className="bg-gray-100 dark:bg-[#161b22] rounded-b-lg p-4">
                  <div className="bg-white dark:bg-[#0d1117] rounded-lg p-4">
                    <h3 className="text-xl font-bold mb-4">Funding Target</h3>
                    {isProjectsLoading ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-gray-400">Total Target Amount:</span>
                          <Skeleton className="h-8 w-32" />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Projects Seeking Funding:</span>
                              <Skeleton className="h-4 w-8" />
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full animate-pulse"
                                style={{ width: "60%" }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Average Target per Project:</span>
                              <Skeleton className="h-4 w-16" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : projectsError ? (
                      <div className="text-center py-4 text-amber-500">
                        <div className="flex flex-col items-center space-y-2">
                          <AlertTriangle className="h-8 w-8" />
                          <p>Unable to load target data</p>
                          <Button size="sm" variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                            {isRefreshing ? (
                              <>
                                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                Retrying...
                              </>
                            ) : (
                              <>
                                <RefreshCw className="mr-2 h-3 w-3" />
                                Retry
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-gray-400">Total Target Amount:</span>
                          <span className="text-2xl font-bold text-green-400">
                            {formatCurrency(projectStats.totalTarget)}
                          </span>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Projects Seeking Funding:</span>
                              <span>{projects.length}</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-cyan-500 rounded-full" style={{ width: "100%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Average Target per Project:</span>
                              <span>
                                {projects.length > 0
                                  ? formatCurrency(projectStats.totalTarget / projects.length)
                                  : "$0"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>

                {/* Raised Tab */}
                <TabsContent value="raised" className="bg-gray-100 dark:bg-[#161b22] rounded-b-lg p-4">
                  <div className="bg-white dark:bg-[#0d1117] rounded-lg p-4">
                    <h3 className="text-xl font-bold mb-4">Funds Raised</h3>
                    {isProjectsLoading ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-gray-400">Total Raised:</span>
                          <Skeleton className="h-8 w-32" />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Funding Progress:</span>
                              <Skeleton className="h-4 w-12" />
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500 rounded-full animate-pulse"
                                style={{ width: "40%" }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Remaining to Target:</span>
                              <Skeleton className="h-4 w-16" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : projectsError ? (
                      <div className="text-center py-4 text-amber-500">
                        <div className="flex flex-col items-center space-y-2">
                          <AlertTriangle className="h-8 w-8" />
                          <p>Unable to load fundraising data</p>
                          <Button size="sm" variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                            {isRefreshing ? (
                              <>
                                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                Retrying...
                              </>
                            ) : (
                              <>
                                <RefreshCw className="mr-2 h-3 w-3" />
                                Retry
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-gray-400">Total Raised:</span>
                          <span className="text-2xl font-bold text-green-400">
                            {formatCurrency(projectStats.totalRaised)}
                          </span>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Funding Progress:</span>
                              <span>
                                {projectStats.totalTarget > 0
                                  ? Math.round((projectStats.totalRaised / projectStats.totalTarget) * 100)
                                  : 0}
                                %
                              </span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500 rounded-full"
                                style={{
                                  width:
                                    projectStats.totalTarget > 0
                                      ? `${Math.min(100, (projectStats.totalRaised / projectStats.totalTarget) * 100)}%`
                                      : "0%",
                                }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Remaining to Target:</span>
                              <span>
                                {formatCurrency(Math.max(0, projectStats.totalTarget - projectStats.totalRaised))}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>

                {/* Status Tab */}
                <TabsContent value="status" className="bg-gray-100 dark:bg-[#161b22] rounded-b-lg p-4">
                  <div className="bg-white dark:bg-[#0d1117] rounded-lg p-4">
                    <h3 className="text-xl font-bold mb-4">Project Status</h3>
                    {isProjectsLoading ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-gray-100 dark:bg-[#161b22] p-3 rounded-lg text-center">
                            <Skeleton className="h-8 w-12 mx-auto" />
                            <div className="text-sm text-gray-400 mt-1">Active</div>
                          </div>
                          <div className="bg-gray-100 dark:bg-[#161b22] p-3 rounded-lg text-center">
                            <Skeleton className="h-8 w-12 mx-auto" />
                            <div className="text-sm text-gray-400 mt-1">Pending</div>
                          </div>
                          <div className="bg-gray-100 dark:bg-[#161b22] p-3 rounded-lg text-center">
                            <Skeleton className="h-8 w-12 mx-auto" />
                            <div className="text-sm text-gray-400 mt-1">Completed</div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="h-4 bg-gray-700 rounded-full overflow-hidden flex">
                            <div className="h-full bg-green-500 animate-pulse" style={{ width: "40%" }}></div>
                            <div className="h-full bg-yellow-500 animate-pulse" style={{ width: "30%" }}></div>
                            <div className="h-full bg-blue-500 animate-pulse" style={{ width: "30%" }}></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Active</span>
                            <span>Pending</span>
                            <span>Completed</span>
                          </div>
                        </div>
                      </div>
                    ) : projectsError ? (
                      <div className="text-center py-4 text-amber-500">
                        <div className="flex flex-col items-center space-y-2">
                          <AlertTriangle className="h-8 w-8" />
                          <p>Unable to load status data</p>
                          <Button size="sm" variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                            {isRefreshing ? (
                              <>
                                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                Retrying...
                              </>
                            ) : (
                              <>
                                <RefreshCw className="mr-2 h-3 w-3" />
                                Retry
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-gray-100 dark:bg-[#161b22] p-3 rounded-lg text-center">
                            <div className="text-2xl font-bold text-green-400">{projectStats.activeCount}</div>
                            <div className="text-sm text-gray-400 mt-1">Active</div>
                          </div>
                          <div className="bg-gray-100 dark:bg-[#161b22] p-3 rounded-lg text-center">
                            <div className="text-2xl font-bold text-yellow-400">{projectStats.pendingCount}</div>
                            <div className="text-sm text-gray-400 mt-1">Pending</div>
                          </div>
                          <div className="bg-gray-100 dark:bg-[#161b22] p-3 rounded-lg text-center">
                            <div className="text-2xl font-bold text-blue-400">{projectStats.completedCount}</div>
                            <div className="text-sm text-gray-400 mt-1">Completed</div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="h-4 bg-gray-700 rounded-full overflow-hidden flex">
                            <div
                              className="h-full bg-green-500"
                              style={{
                                width:
                                  projects.length > 0 ? `${(projectStats.activeCount / projects.length) * 100}%` : "0%",
                              }}
                            ></div>
                            <div
                              className="h-full bg-yellow-500"
                              style={{
                                width:
                                  projects.length > 0
                                    ? `${(projectStats.pendingCount / projects.length) * 100}%`
                                    : "0%",
                              }}
                            ></div>
                            <div
                              className="h-full bg-blue-500"
                              style={{
                                width:
                                  projects.length > 0
                                    ? `${(projectStats.completedCount / projects.length) * 100}%`
                                    : "0%",
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Active</span>
                            <span>Pending</span>
                            <span>Completed</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* What's New Section */}
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Whats New?</h3>
              <div className="bg-gray-100 dark:bg-[#161b22] rounded-lg p-4 overflow-auto max-h-80">
                {announcementsError ? (
                  <div className="text-center py-8 text-amber-500">
                    <p>{announcementsError}</p>
                  </div>
                ) : isAnnouncementsLoading ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-8 w-8 animate-spin mb-4" />
                      <p>Loading announcements...</p>
                    </div>
                  </div>
                ) : announcements.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">"No announcements at this time."</div>
                ) : (
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <div
                        key={announcement.id}
                        className="border-b border-gray-700 dark:border-gray-700 light:border-gray-300 pb-3 last:border-0"
                      >
                        <h4 className="font-medium text-gray-900 dark:text-white">{announcement.title}</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{announcement.content}</p>
                        <div className="text-xs text-gray-500 mt-2">
                          {new Date(announcement.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Returns and Image Row */}
        <div className="grid grid-cols-1 gap-8 mb-12">
          {/* Projects Returns Section */}
          <div className="bg-cyan-600 p-8 rounded-lg flex flex-col justify-between w-full">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-white">Projects Returns:</h2>
              <h3 className="text-xl mb-3 text-cyan-50">Investment Performance</h3>
              <p className="text-cyan-100 text-sm mb-8">
                Tracking overall investment performance and returns distribution across all projects
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {/* Use memoized values to prevent re-renders */}
              {[
                {
                  title: "Investors Participating",
                  value: isLoading ? null : investorCount?.toLocaleString() || "0",
                },
                {
                  title: "Active Projects",
                  value: isLoading ? null : activeProjects?.toLocaleString() || "0",
                },
                {
                  title: "Total Funds Invested",
                  value: isLoading ? null : `$${totalFunds?.toLocaleString() || "0"}`,
                },
                {
                  title: "Avg. Investment Returns",
                  value: isLoading ? null : `${avgReturns?.toFixed(2) || "0"}%`,
                },
              ].map((item, index) => (
                <div key={index} className="bg-white dark:bg-[#0d1117] p-5 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-cyan-700 dark:text-cyan-400">
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-8 w-16" />
                        <span className="text-xs text-gray-400">Loading...</span>
                      </div>
                    ) : (
                      item.value
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">{item.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features and Image Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Key Features & Investment Visualization</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Key Features Content */}
              <div className="bg-gray-100 dark:bg-[#161b22] p-4 rounded-lg h-full">
                <ul className="space-y-3 text-sm">
                  <li>
                    <strong>Connecting investors with real-world agricultural projects for financial returns.</strong>
                  </li>
                  <li className="pl-4">
                    • <strong>Project Discovery</strong>
                  </li>
                  <li className="pl-8">Browse a diverse range of farm projects seeking funding and investment</li>
                  <li className="pl-4">
                    • <strong>Detailed Project Information</strong>
                  </li>
                  <li className="pl-8">Review comprehensive details, assess risks, and understand potential returns</li>
                  <li className="pl-4">
                    • <strong>Secure Investment Platform</strong>
                  </li>
                  <li className="pl-8">Invest funds securely and track your investments in real-time</li>
                  <li className="pl-4">
                    • <strong>Portfolio Tracking</strong>
                  </li>
                  <li className="pl-8">Monitor your investment performance and receive notifications</li>
                  <li className="pl-4">
                    • <strong>Returns Distribution</strong>
                  </li>
                  <li className="pl-8">Receive predictable harvest and yield updates</li>
                  <li className="pl-4">
                    • <strong>Direct Impact</strong>
                  </li>
                  <li className="pl-8">Support sustainable agriculture and contribute to real-world projects</li>
                </ul>
              </div>

              {/* Image Section */}
              <div className="bg-gray-100 dark:bg-[#161b22] rounded-lg flex items-center justify-center p-6 shadow-lg overflow-hidden h-full">
                <div className="aspect-video w-full">
                  <iframe
                    className="w-full h-full rounded-md"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Investment Tutorial Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Projects Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
            {isProjectsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-[#1a1d24] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm"
                  >
                    <div className="h-56 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                    <div className="p-6 space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : projectsError ? (
              <div className="bg-white dark:bg-[#1a1d24] rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <AlertTriangle className="h-16 w-16 text-amber-500" />
                  <p className="text-gray-600 dark:text-gray-400 text-lg">Unable to load featured projects</p>
                  <Button size="sm" variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                    {isRefreshing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Retrying...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Try Again
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : projects.length === 0 ? (
              <div className="bg-white dark:bg-[#1a1d24] rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-lg">No projects available at the moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.slice(0, 6).map((project) => (
                  <div
                    key={project.id}
                    className="bg-white dark:bg-[#1a1d24] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Project Image */}
                    <div className="relative h-56 overflow-hidden">
                      {project.image_url ? (
                        <img
                          src={project.image_url || "/placeholder.svg"}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="text-xl font-bold mb-1">{project.category}</div>
                            <div className="text-sm opacity-90">Investment Project</div>
                          </div>
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : project.status === "pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          }`}
                        >
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                      </div>

                      {/* Funding Progress Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="text-white text-sm font-medium mb-1">
                          {Math.round(((project.total_shares - project.available_shares) / project.total_shares) * 100)}
                          % Funded
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-white rounded-full h-2 transition-all duration-300"
                            style={{
                              width: `${Math.round(((project.total_shares - project.available_shares) / project.total_shares) * 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-6">
                      {/* Project Title & Location */}
                      <div className="mb-4">
                        <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white line-clamp-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                          {project.location} • {project.category}
                        </p>
                      </div>

                      {/* Financial Information */}
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                              Share Price
                            </p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {formatCurrency(project.price_per_share)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                              Available
                            </p>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                              {project.available_shares.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Target Amount */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Target Amount</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {formatCurrency(project.price_per_share * project.total_shares)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link href={`/buy/${project.id}`} className="block">
                        <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 rounded-lg transition-colors duration-200">
                          View Project Details
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {projects.length > 6 && (
              <div className="mt-6 text-center">
                <Link href="/discover">
                  <Button variant="outline" className="px-6">
                    View All Projects
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="bg-gray-100 dark:bg-[#161b22] rounded-lg overflow-hidden">
              {[
                {
                  question: "What is the purpose of this platform?",
                  answer:
                    "This platform connects investors with real-world business projects seeking funding. It provides a secure and transparent way to invest in various sectors including agriculture, technology, and manufacturing, allowing you to diversify your investment portfolio while supporting real businesses.",
                },
                {
                  question: "How do I browse available investment projects?",
                  answer:
                    "You can browse projects by navigating to the Project Discovery section. There, you can filter projects by category, investment amount, expected returns, and risk level. Each project includes detailed information about the business, financial projections, and team background.",
                },
                {
                  question: "How do I invest in a project?",
                  answer:
                    "After creating an account and completing the verification process, you can invest in a project by selecting the desired project, reviewing all details, and clicking the 'Invest Now' button. You'll be guided through the investment process, including selecting your investment amount and payment method.",
                },
                {
                  question: "How do I track my investment?",
                  answer:
                    "All your investments can be tracked through your personalized dashboard in the Portfolio Tracking section. You'll receive regular updates on project progress, financial performance, and upcoming distributions. You can also set up notifications for important milestones.",
                },
                {
                  question: "When will receive returns on my investment?",
                  answer:
                    "Return schedules vary by project and are clearly outlined in each project's details. Some projects provide quarterly distributions, while others may distribute returns at project completion or at specific milestones. The expected timeline for returns is always provided before you invest.",
                },
                {
                  question: "How do project owners list their projects?",
                  answer:
                    "Project owners go through a rigorous application and verification process. They must provide detailed business plans, financial projections, legal documentation, and undergo background checks. Only projects that meet our strict criteria for viability and transparency are listed on the platform.",
                },
                {
                  question: "How do project owners provide updates to investors?",
                  answer:
                    "Project owners are required to provide regular updates through our platform. These updates include progress reports, financial statements, and any significant developments. Investors receive notifications when new updates are available and can access all historical updates in the project dashboard.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-700 dark:border-gray-700 light:border-gray-300 last:border-b-0"
                >
                  <button
                    className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <span
                      className="text-xl transition-transform duration-300"
                      style={{ transform: activeFaq === index ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="px-4 pb-4 text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
