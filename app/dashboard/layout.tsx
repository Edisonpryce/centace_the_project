"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Search,
  User,
  Home,
  PieChart,
  Compass,
  ShoppingCart,
  UserCircle,
  Settings,
  ChevronDown,
  MapPin,
  Menu,
  X,
  Wallet,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import { useTheme } from "@/components/theme-provider"
import { useAuth } from "@/lib/context/auth-context"
import { NotificationsProvider } from "@/lib/context/notifications-context"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageCurrencyDropdown } from "@/components/language-currency-dropdown"
import { useInactivityLogout } from "@/hooks/use-inactivity-logout"
import { SessionTimeoutWarning } from "@/components/session-timeout-warning"
import { useToast } from "@/hooks/use-toast"
import { SESSION_CONFIG } from "@/lib/config/session-config"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { user, profile, signOut, isLoading } = useAuth()
  const { toast } = useToast()
  const isDark = resolvedTheme === "dark"

  // Ref to track if user is logging out
  const isLoggingOut = useRef(false)

  // State hooks - must be declared unconditionally at the top
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [mobileNotificationsOpen, setMobileNotificationsOpen] = useState(false)
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1)

  // Sample search suggestions data
  const searchSuggestions = [
    { type: "project", title: "Miami Real Estate Development", category: "Real Estate" },
    { type: "project", title: "Solar Farm Investment", category: "Energy" },
    { type: "project", title: "Tech Startup Series A", category: "Technology" },
    { type: "project", title: "Agricultural Land Investment", category: "Agriculture" },
    { type: "page", title: "Portfolio Overview", url: "/dashboard/portfolio" },
    { type: "page", title: "Account Statement", url: "/dashboard/account/statement" },
    { type: "page", title: "Visit Investment Site", url: "/dashboard/visit" },
    { type: "page", title: "Settings", url: "/dashboard/settings" },
    { type: "action", title: "Make a Deposit", url: "/dashboard/funding" },
    { type: "action", title: "View Orders", url: "/dashboard/orders" },
  ]

  // Filter suggestions based on search query
  const filteredSuggestions =
    searchQuery.length > 0
      ? searchSuggestions
          .filter(
            (suggestion) =>
              suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (suggestion.category && suggestion.category.toLowerCase().includes(searchQuery.toLowerCase())),
          )
          .slice(0, 6)
      : []
  const [assertsOpen, setAssertsOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  // Handle sign out
  const handleSignOut = async () => {
    try {
      // Set logging out flag to prevent redirect to login
      isLoggingOut.current = true

      // Sign out
      await signOut()

      // Navigate to home page
      router.push("/")
    } catch (error) {
      console.error("Error during sign out:", error)
      // Force navigation to home page even if there's an error
      router.push("/")
    }
  }

  // Set up inactivity logout
  const { showWarning, timeRemaining, formatTimeRemaining, extendSession } = useInactivityLogout({
    inactivityTimeout: SESSION_CONFIG.INACTIVITY_TIMEOUT, // 10 minutes
    warningTime: SESSION_CONFIG.WARNING_TIME, // 5 minutes warning
    onLogout: handleSignOut,
    onWarning: () => {
      toast({
        title: "Session Expiring Soon",
        description: "You'll be logged out due to inactivity.",
        variant: "warning",
      })
    },
    onActivity: () => {
      // Optional callback when activity is detected
    },
    enabled: !!user, // Only enable when user is logged in
  })

  // All useEffect hooks must be declared unconditionally
  useEffect(() => {
    setIsAuthenticated(!isLoading && !!user)
  }, [user, isLoading])

  useEffect(() => {
    if (!isLoading) {
      setShouldRedirect(!user && !isLoggingOut.current)
    }
  }, [user, isLoading])

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/login")
    }
  }, [shouldRedirect, router])

  // Add this after the hooks declarations
  useEffect(() => {
    // If user is null after loading is complete, redirect to login
    // But only if not logging out
    if (!isLoading && !user && !isLoggingOut.current) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // Initialize dropdown states based on the current path and handle theme
  useEffect(() => {
    // Initialize assertsOpen based on the current path
    let isAssertsPage = false
    let isAccountPage = false

    if (pathname === "/dashboard/overview" || pathname === "/dashboard/portfolio") {
      isAssertsPage = true
    }

    if (pathname === "/dashboard/account/statement" || pathname === "/dashboard/account/financial-report") {
      isAccountPage = true
    }

    setAssertsOpen(isAssertsPage)
    setAccountOpen(isAccountPage)
  }, [pathname])

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileSearchOpen(false)
    setMobileNotificationsOpen(false)
    setMobileProfileOpen(false)
  }, [pathname])

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // If still loading, show loading state - but don't use early returns before hooks
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
        <div
          className={`w-12 h-12 rounded-full border-4 ${isDark ? "border-gray-700 border-t-blue-500" : "border-gray-300 border-t-blue-600"} animate-spin`}
        ></div>
      </div>
    )
  }

  // Separate toggle functions that won't be affected by the useEffect
  const toggleAsserts = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setAssertsOpen((prev) => !prev)
  }

  const toggleAccount = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setAccountOpen((prev) => !prev)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setShowSuggestions(value.length > 0)
    setSelectedSuggestion(-1)
  }

  const handleSearchSubmit = (query: string = searchQuery) => {
    if (query.trim()) {
      console.log("Searching for:", query)
      // Add your search logic here
      setShowSuggestions(false)
      setSearchQuery("")
    }
  }

  const handleSuggestionSelect = (suggestion: any) => {
    if (suggestion.url) {
      router.push(suggestion.url)
    } else {
      handleSearchSubmit(suggestion.title)
    }
    setShowSuggestions(false)
    setSearchQuery("")
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedSuggestion((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedSuggestion((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (selectedSuggestion >= 0) {
        handleSuggestionSelect(filteredSuggestions[selectedSuggestion])
      } else {
        handleSearchSubmit()
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
      setSelectedSuggestion(-1)
    }
  }

  // Theme-based style variables
  const themeStyles = {
    background: isDark ? "bg-[#0a0a0f]" : "bg-[#f8fafc]",
    backgroundSecondary: isDark ? "bg-[#0d1117]" : "bg-white",
    backgroundTertiary: isDark ? "bg-[#161b22]" : "bg-gray-50",
    backgroundCard: isDark ? "bg-[#1a1d24]" : "bg-white",
    text: isDark ? "text-white" : "text-gray-900",
    textSecondary: isDark ? "text-gray-100" : "text-gray-700",
    textTertiary: isDark ? "text-gray-200" : "text-gray-600",
    border: isDark ? "border-gray-800" : "border-gray-200",
    borderSecondary: isDark ? "border-gray-700" : "border-gray-300",
    hover: isDark ? "hover:bg-[#21262d]" : "hover:bg-gray-50",
    activeNav: isDark ? "bg-[#21262d] text-white" : "bg-blue-50 text-blue-600",
    shadow: isDark ? "shadow-[0_4px_12px_rgba(0,0,0,0.3)]" : "shadow-[0_4px_12px_rgba(0,0,0,0.05)]",
    accent: isDark ? "text-blue-400" : "text-blue-600",
    accentBg: isDark ? "bg-blue-900/20" : "bg-blue-50",
    buttonBg: isDark ? "bg-[#21262d]" : "bg-gray-100",
    buttonText: isDark ? "text-gray-200" : "text-gray-700",
    buttonHover: isDark ? "hover:bg-[#2d333b]" : "hover:bg-gray-200",
  }

  return (
    <NotificationsProvider userId={user?.id || ""}>
      <div
        className={`min-h-screen flex flex-col ${themeStyles.background} ${themeStyles.text} font-sans antialiased`}
        data-theme={resolvedTheme}
      >
        {/* Session Timeout Warning */}
        <SessionTimeoutWarning
          show={showWarning}
          timeRemaining={timeRemaining}
          formattedTime={formatTimeRemaining()}
          onExtend={extendSession}
          onLogout={handleSignOut}
        />

        {/* Navigation Bar */}
        <header
          className={`${themeStyles.backgroundSecondary} border-b ${themeStyles.border} px-4 py-3 flex items-center justify-between ${themeStyles.shadow} sticky top-0 z-30`}
        >
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`${themeStyles.textSecondary} rounded-full mr-2 md:hidden`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Link href="/dashboard" className="flex items-center group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold mr-2 shadow-lg group-hover:shadow-xl transition-all duration-200">
                C
              </div>
              <span className="font-semibold tracking-tight group-hover:text-blue-500 transition-colors duration-200">
                Centace
              </span>
            </Link>
            <nav className="hidden md:flex space-x-6 ml-6">
              <Link
                href="/dashboard/discover"
                className={`text-sm ${themeStyles.textSecondary} hover:${themeStyles.text} transition-colors duration-200 ${pathname === "/dashboard/discover" ? themeStyles.accent : ""}`}
              >
                Project Discovery
              </Link>
              <Link
                href="/dashboard/portfolio"
                className={`text-sm ${themeStyles.textSecondary} hover:${themeStyles.text} transition-colors duration-200 ${pathname === "/dashboard/portfolio" ? themeStyles.accent : ""}`}
              >
                Portfolio Tracking
              </Link>
              <Link
                href="/dashboard/account/financial-report"
                className={`text-sm ${themeStyles.textSecondary} hover:${themeStyles.text} transition-colors duration-200 ${pathname === "/dashboard/account/financial-report" ? themeStyles.accent : ""}`}
              >
                Returns Distribution
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-4">
            {/* Search - Desktop */}
            <div className="relative hidden md:block group">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${themeStyles.textTertiary} group-focus-within:text-blue-500 transition-colors duration-200`}
              />
              <input
                type="text"
                aria-label="Search dashboard"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className={`w-48 lg:w-64 ${
                  isDark ? "bg-[#21262d] text-gray-200" : "bg-gray-100 text-gray-800"
                } ${themeStyles.border} pl-10 py-2 pr-10 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200`}
                placeholder="Search projects, orders..."
              />
              {searchQuery && (
                <button
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeStyles.textTertiary} hover:${themeStyles.text} transition-colors duration-200`}
                  onClick={() => {
                    setSearchQuery("")
                    setShowSuggestions(false)
                  }}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              {/* Search Suggestions Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div
                  className={`absolute top-full left-0 right-0 mt-2 ${themeStyles.backgroundSecondary} ${themeStyles.border} rounded-lg ${themeStyles.shadow} z-50 max-h-80 overflow-y-auto`}
                >
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className={`w-full text-left px-4 py-3 flex items-center space-x-3 ${
                        index === selectedSuggestion
                          ? themeStyles.accentBg + " " + themeStyles.accent
                          : themeStyles.textSecondary +
                            " hover:" +
                            themeStyles.accentBg +
                            " hover:" +
                            themeStyles.accent
                      } ${index === 0 ? "rounded-t-lg" : ""} ${index === filteredSuggestions.length - 1 ? "rounded-b-lg" : ""} transition-colors duration-150`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          suggestion.type === "project"
                            ? "bg-blue-100 text-blue-600"
                            : suggestion.type === "page"
                              ? "bg-green-100 text-green-600"
                              : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {suggestion.type === "project" ? (
                          <PieChart className="h-4 w-4" />
                        ) : suggestion.type === "page" ? (
                          <Compass className="h-4 w-4" />
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{suggestion.title}</div>
                        {suggestion.category && (
                          <div className={`text-xs ${themeStyles.textTertiary}`}>{suggestion.category}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className={`${themeStyles.textSecondary} rounded-full md:hidden`}
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Deposit Button - Desktop */}
            <Button
              variant="outline"
              size="sm"
              className={`${themeStyles.textSecondary} ${themeStyles.border} ${themeStyles.backgroundSecondary} rounded-full transition-colors duration-200 hidden sm:flex`}
              onClick={() => router.push("/dashboard/funding")}
            >
              Deposit
            </Button>

            {/* Notifications */}
            <div className="relative">
              {/* Use our custom NotificationsDropdown component */}
              <NotificationsDropdown />
            </div>

            {/* User Profile */}
            <div className="relative group">
              {/* Desktop Profile Button */}
              <Button
                variant="ghost"
                size="icon"
                className={`${themeStyles.textSecondary} rounded-full hover:${themeStyles.accentBg} hover:${themeStyles.accent} transition-colors duration-200 hidden md:flex`}
              >
                <User className="h-5 w-5" />
              </Button>

              {/* Mobile Profile Button */}
              <Button
                variant="ghost"
                size="icon"
                className={`${themeStyles.textSecondary} rounded-full md:hidden`}
                onClick={() => {
                  setMobileProfileOpen(!mobileProfileOpen)
                  setMobileNotificationsOpen(false)
                  setMobileSearchOpen(false)
                }}
              >
                <User className="h-5 w-5" />
              </Button>

              {/* Desktop Dropdown Menu */}
              <div
                className={`absolute right-0 top-full mt-2 w-64 origin-top-right rounded-md ${themeStyles.backgroundSecondary} ${themeStyles.shadow} border ${themeStyles.border} py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50 hidden md:block`}
              >
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-700 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                    {profile?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-medium ${themeStyles.text}`}>
                      {profile?.email || user?.email || "User"}
                    </span>
                    <span className={`text-xs ${themeStyles.textTertiary}`}>View Profile</span>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    href="/dashboard"
                    className={`flex items-center px-4 py-2 text-sm ${themeStyles.textSecondary} hover:${themeStyles.accent} hover:${themeStyles.accentBg}`}
                  >
                    <Home className="h-4 w-4 mr-3" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/overview"
                    className={`flex items-center px-4 py-2 text-sm ${themeStyles.textSecondary} hover:${themeStyles.accent} hover:${themeStyles.accentBg}`}
                  >
                    <PieChart className="h-4 w-4 mr-3" />
                    Assets
                  </Link>
                  <Link
                    href="/dashboard/discover"
                    className={`flex items-center px-4 py-2 text-sm ${themeStyles.textSecondary} hover:${themeStyles.accent} hover:${themeStyles.accentBg}`}
                  >
                    <Compass className="h-4 w-4 mr-3" />
                    Discover
                  </Link>
                  <Link
                    href="/dashboard/orders"
                    className={`flex items-center px-4 py-2 text-sm ${themeStyles.textSecondary} hover:${themeStyles.accent} hover:${themeStyles.accentBg}`}
                  >
                    <ShoppingCart className="h-4 w-4 mr-3" />
                    Orders
                  </Link>
                  <Link
                    href="/dashboard/visit"
                    className={`flex items-center px-4 py-2 text-sm ${themeStyles.textSecondary} hover:${themeStyles.accent} hover:${themeStyles.accentBg}`}
                  >
                    <MapPin className="h-4 w-4 mr-3" />
                    Visit Site
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className={`flex items-center px-4 py-2 text-sm ${themeStyles.textSecondary} hover:${themeStyles.accent} hover:${themeStyles.accentBg}`}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Link>
                </div>

                {/* Logout */}
                <div className={`border-t ${themeStyles.border} py-1`}>
                  <button
                    onClick={handleSignOut}
                    className={`w-full text-left flex items-center px-4 py-2 text-sm ${themeStyles.textSecondary} hover:text-red-500 hover:bg-red-500/10`}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Log Out
                  </button>
                </div>
              </div>
            </div>

            {/* Vertical Separator */}
            <div className={`hidden md:block h-6 w-[1.5px] ${isDark ? "bg-gray-600" : "bg-gray-300"} mx-2`}></div>

            {/* Globe Icon - Replace with LanguageCurrencyDropdown */}
            <LanguageCurrencyDropdown isDark={isDark} />

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </header>

        {/* Mobile Search Panel */}
        {mobileSearchOpen && (
          <div
            className={`fixed inset-x-0 top-[56px] z-20 ${themeStyles.backgroundSecondary} ${themeStyles.border} border-t-0 border-b p-4 md:hidden`}
          >
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${themeStyles.textTertiary}`}
              />
              <input
                type="text"
                aria-label="Search dashboard"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className={`w-full ${
                  isDark ? "bg-[#21262d]" : "bg-gray-100"
                } ${themeStyles.border} pl-10 py-2 pr-10 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                placeholder="Search projects, orders..."
                autoFocus
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button
                  className={`p-1 rounded-full ${themeStyles.textTertiary} hover:${themeStyles.text}`}
                  onClick={() => {
                    const input = document.querySelector('input[aria-label="Search dashboard"]')
                    if (input instanceof HTMLInputElement) {
                      input.value = ""
                      input.focus()
                    }
                  }}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
                <button
                  className={`p-1 rounded-full ${themeStyles.accent} bg-blue-500 text-white`}
                  onClick={() => {
                    const input = document.querySelector('input[aria-label="Search dashboard"]')
                    if (input instanceof HTMLInputElement) {
                      console.log("Search:", input.value)
                      setMobileSearchOpen(false)
                    }
                  }}
                  aria-label="Submit search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* Mobile Search Suggestions */}
            {filteredSuggestions.length > 0 && (
              <div className="mt-4">
                <p className={`text-xs ${themeStyles.textTertiary} mb-2`}>Suggestions</p>
                <div className="space-y-1">
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleSuggestionSelect(suggestion)
                        setMobileSearchOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center space-x-3 ${themeStyles.textSecondary} hover:${themeStyles.accentBg} hover:${themeStyles.accent} transition-colors duration-150`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          suggestion.type === "project"
                            ? "bg-blue-100 text-blue-600"
                            : suggestion.type === "page"
                              ? "bg-green-100 text-green-600"
                              : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {suggestion.type === "project" ? (
                          <PieChart className="h-3 w-3" />
                        ) : suggestion.type === "page" ? (
                          <Compass className="h-3 w-3" />
                        ) : (
                          <Search className="h-3 w-3" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{suggestion.title}</div>
                        {suggestion.category && (
                          <div className={`text-xs ${themeStyles.textTertiary}`}>{suggestion.category}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile Notifications Panel */}
        {mobileNotificationsOpen && (
          <div
            className={`fixed inset-x-0 top-[56px] z-20 ${themeStyles.backgroundSecondary} ${themeStyles.border} border-t-0 border-b md:hidden max-h-[80vh] overflow-auto`}
          >
            <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
              <h3 className={`text-sm font-medium ${themeStyles.text}`}>Notifications</h3>
              <div className="flex items-center space-x-4">
                <span className={`text-xs ${themeStyles.accent} cursor-pointer`}>Mark all as read</span>
                <Button variant="ghost" size="sm" onClick={() => setMobileNotificationsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Notification Items - replace with real notifications */}
            <div className="max-h-[calc(80vh-56px)] overflow-y-auto">
              {/* We'll use the NotificationsDropdown component for mobile view as well */}
            </div>
          </div>
        )}

        {/* Mobile Profile Panel */}
        {mobileProfileOpen && (
          <div
            className={`fixed inset-x-0 top-[56px] z-20 ${themeStyles.backgroundSecondary} ${themeStyles.border} border-t-0 border-b md:hidden max-h-[80vh] overflow-auto`}
          >
            <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                  {profile?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-medium ${themeStyles.text}`}>
                    {profile?.email || user?.email || "User"}
                  </span>
                  <span className={`text-xs ${themeStyles.textTertiary}`}>View Profile</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setMobileProfileOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link
                href="/dashboard"
                className={`flex items-center px-4 py-3 ${themeStyles.textSecondary} ${themeStyles.hover}`}
              >
                <Home className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/overview"
                className={`flex items-center px-4 py-3 ${themeStyles.textSecondary} ${themeStyles.hover}`}
              >
                <PieChart className="h-5 w-5 mr-3" />
                Asserts
              </Link>
              <Link
                href="/dashboard/discover"
                className={`flex items-center px-4 py-3 ${themeStyles.textSecondary} ${themeStyles.hover}`}
              >
                <Compass className="h-5 w-5 mr-3" />
                Discover
              </Link>
              <Link
                href="/dashboard/orders"
                className={`flex items-center px-4 py-3 ${themeStyles.textSecondary} ${themeStyles.hover}`}
              >
                <ShoppingCart className="h-5 w-5 mr-3" />
                Orders
              </Link>
              <Link
                href="/dashboard/visit"
                className={`flex items-center px-4 py-3 ${themeStyles.textSecondary} ${themeStyles.hover}`}
              >
                <MapPin className="h-5 w-5 mr-3" />
                Visit Site
              </Link>
              <Link
                href="/dashboard/settings"
                className={`flex items-center px-4 py-3 ${themeStyles.textSecondary} ${themeStyles.hover}`}
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </Link>
            </div>

            {/* Logout */}
            <div className={`border-t ${themeStyles.border} py-2`}>
              <button
                onClick={handleSignOut}
                className={`w-full text-left flex items-center px-4 py-3 ${themeStyles.textSecondary} hover:text-red-500 hover:bg-red-500/10`}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Log Out
              </button>
            </div>

            {/* Theme Toggle */}
            <div className={`border-t ${themeStyles.border} py-3 px-4`}>
              <div className="flex items-center justify-between">
                <LanguageCurrencyDropdown isDark={isDark} />
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-50 light:bg-opacity-30 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className={`fixed inset-y-0 left-0 w-[280px] ${themeStyles.backgroundSecondary} ${themeStyles.shadow} overflow-y-auto z-50`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <Link href="/dashboard" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold mr-2 shadow-lg">
                    C
                  </div>
                  <span className="font-semibold tracking-tight">Centace</span>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4">
                <Link
                  href="/dashboard"
                  className={`flex items-center space-x-3 p-3 rounded-lg mb-2 ${
                    pathname === "/dashboard"
                      ? themeStyles.activeNav
                      : themeStyles.textSecondary + " " + themeStyles.hover
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>

                <div className="mb-2">
                  <button
                    onClick={(e) => {
                      toggleAsserts(e)
                    }}
                    className={`w-full flex items-center justify-between p-3 ${
                      pathname.includes("/dashboard/overview") || pathname.includes("/dashboard/portfolio")
                        ? themeStyles.activeNav
                        : themeStyles.textSecondary + " " + themeStyles.hover
                    } rounded-lg`}
                  >
                    <div className="flex items-center space-x-3">
                      <PieChart className="h-5 w-5" />
                      <span className="font-medium">Asserts</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
                        assertsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      assertsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <Link
                      href="/dashboard/overview"
                      className={`flex items-center p-3 ${
                        pathname === "/dashboard/overview"
                          ? themeStyles.activeNav
                          : themeStyles.textSecondary + " " + themeStyles.hover
                      } rounded-lg ml-6 mt-1`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="font-medium">Overview</span>
                    </Link>

                    <Link
                      href="/dashboard/portfolio"
                      className={`flex items-center p-3 ${
                        pathname === "/dashboard/portfolio"
                          ? themeStyles.activeNav
                          : themeStyles.textSecondary + " " + themeStyles.hover
                      } rounded-lg ml-6 mt-1`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="font-medium">Portfolio Tracking</span>
                    </Link>
                  </div>
                </div>

                <Link
                  href="/dashboard/discover"
                  className={`flex items-center space-x-3 p-3 rounded-lg mb-2 ${
                    pathname === "/dashboard/discover"
                      ? themeStyles.activeNav
                      : themeStyles.textSecondary + " " + themeStyles.hover
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Compass className="h-5 w-5" />
                  <span className="font-medium">Discover</span>
                </Link>

                <Link
                  href="/dashboard/orders"
                  className={`flex items-center space-x-3 p-3 rounded-lg mb-2 ${
                    pathname === "/dashboard/orders"
                      ? themeStyles.activeNav
                      : themeStyles.textSecondary + " " + themeStyles.hover
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="font-medium">Orders</span>
                </Link>

                <Link
                  href="/dashboard/visit"
                  className={`flex items-center space-x-3 p-3 rounded-lg mb-2 ${
                    pathname === "/dashboard/visit"
                      ? themeStyles.activeNav
                      : themeStyles.textSecondary + " " + themeStyles.hover
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">Visit Site</span>
                </Link>

                <div className="mb-2">
                  <button
                    onClick={(e) => {
                      toggleAccount(e)
                    }}
                    className={`w-full flex items-center justify-between p-3 ${
                      pathname.includes("/dashboard/account")
                        ? themeStyles.activeNav
                        : themeStyles.textSecondary + " " + themeStyles.hover
                    } rounded-lg`}
                  >
                    <div className="flex items-center space-x-3">
                      <UserCircle className="h-5 w-5" />
                      <span className="font-medium">Account</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
                        accountOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      accountOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <Link
                      href="/dashboard/account/statement"
                      className={`flex items-center p-3 ${
                        pathname === "/dashboard/account/statement"
                          ? themeStyles.activeNav
                          : themeStyles.textSecondary + " " + themeStyles.hover
                      } rounded-lg ml-6 mt-1`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="font-medium">Account Statement</span>
                    </Link>

                    <Link
                      href="/dashboard/account/financial-report"
                      className={`flex items-center p-3 ${
                        pathname === "/dashboard/account/financial-report"
                          ? themeStyles.activeNav
                          : themeStyles.textSecondary + " " + themeStyles.hover
                      } rounded-lg ml-6 mt-1`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="font-medium">Financial Report</span>
                    </Link>
                  </div>
                </div>

                <Link
                  href="/dashboard/settings"
                  className={`flex items-center space-x-3 p-3 rounded-lg mb-2 ${
                    pathname === "/dashboard/settings"
                      ? themeStyles.activeNav
                      : themeStyles.textSecondary + " " + themeStyles.hover
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Settings</span>
                </Link>

                {/* Deposit Button - Mobile */}
                <Button
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    router.push("/dashboard/funding")
                  }}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Deposit
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-1">
          {/* Sidebar - Desktop Only */}
          <aside
            className={`w-[220px] ${themeStyles.background} p-4 flex flex-col ${themeStyles.shadow} overflow-y-auto hidden md:flex`}
          >
            <div className="space-y-1">
              <Link
                href="/dashboard"
                className={`flex items-center space-x-3 p-2.5 rounded-lg transition-all duration-200 ${
                  pathname === "/dashboard"
                    ? themeStyles.activeNav
                    : themeStyles.textSecondary + " hover:" + themeStyles.text
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>

              <div>
                <button
                  onClick={toggleAsserts}
                  className={`w-full flex items-center justify-between space-x-3 p-2.5 ${
                    pathname.includes("/dashboard/overview") || pathname.includes("/dashboard/portfolio")
                      ? themeStyles.activeNav
                      : themeStyles.hover + " " + themeStyles.textSecondary
                  } rounded-lg transition-all duration-200`}
                >
                  <div className="flex items-center space-x-3">
                    <PieChart className="h-5 w-5" />
                    <span className="text-sm font-medium">Asserts</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 opacity-70 transition-transform duration-300 ease-in-out ${
                      assertsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  assertsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <Link
                  href="/dashboard/overview"
                  className={`flex items-center space-x-3 p-2.5 ${
                    pathname === "/dashboard/overview"
                      ? themeStyles.activeNav
                      : themeStyles.hover + " " + themeStyles.textSecondary
                  } rounded-lg transition-all duration-200 pl-10 transform ${
                    assertsOpen ? "translate-y-0" : "-translate-y-2"
                  }`}
                >
                  <span className="text-sm font-medium">Overview</span>
                </Link>

                <Link
                  href="/dashboard/portfolio"
                  className={`flex items-center space-x-3 p-2.5 ${
                    pathname === "/dashboard/portfolio"
                      ? themeStyles.activeNav
                      : themeStyles.hover + " " + themeStyles.textSecondary
                  } rounded-lg transition-all duration-200 pl-10 transform ${
                    assertsOpen ? "translate-y-0" : "-translate-y-2"
                  }`}
                >
                  <span className="text-sm font-medium">Portfolio Tracking</span>
                </Link>
              </div>

              <Link
                href="/dashboard/discover"
                className={`flex items-center space-x-3 p-2.5 ${
                  pathname === "/dashboard/discover"
                    ? themeStyles.activeNav
                    : themeStyles.hover + " " + themeStyles.textSecondary
                } rounded-lg transition-all duration-200`}
              >
                <Compass className="h-5 w-5" />
                <span className="text-sm font-medium">Discover</span>
              </Link>

              <Link
                href="/dashboard/orders"
                className={`flex items-center space-x-3 p-2.5 ${
                  pathname === "/dashboard/orders"
                    ? themeStyles.activeNav
                    : themeStyles.hover + " " + themeStyles.textSecondary
                } rounded-lg transition-all duration-200`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="text-sm font-medium">Orders</span>
              </Link>

              <Link
                href="/dashboard/visit"
                className={`flex items-center space-x-3 p-2.5 ${
                  pathname === "/dashboard/visit"
                    ? themeStyles.activeNav
                    : themeStyles.hover + " " + themeStyles.textSecondary
                } rounded-lg transition-all duration-200`}
              >
                <MapPin className="h-5 w-5" />
                <span className="text-sm font-medium">Visit Site</span>
              </Link>

              <div>
                <button
                  onClick={toggleAccount}
                  className={`w-full flex items-center justify-between space-x-3 p-2.5 ${
                    pathname.includes("/dashboard/account")
                      ? themeStyles.activeNav
                      : themeStyles.hover + " " + themeStyles.textSecondary
                  } rounded-lg transition-all duration-200`}
                >
                  <div className="flex items-center space-x-3">
                    <UserCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Account</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 opacity-70 transition-transform duration-300 ease-in-out ${
                      accountOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  accountOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <Link
                  href="/dashboard/account/statement"
                  className={`flex items-center space-x-3 p-2.5 ${
                    pathname === "/dashboard/account/statement"
                      ? themeStyles.activeNav
                      : themeStyles.hover + " " + themeStyles.textSecondary
                  } rounded-lg transition-all duration-200 pl-10 transform ${
                    accountOpen ? "translate-y-0" : "-translate-y-2"
                  }`}
                >
                  <span className="text-sm font-medium">Account Statement</span>
                </Link>

                <Link
                  href="/dashboard/account/financial-report"
                  className={`flex items-center space-x-3 p-2.5 ${
                    pathname === "/dashboard/account/financial-report"
                      ? themeStyles.activeNav
                      : themeStyles.hover + " " + themeStyles.textSecondary
                  } rounded-lg transition-all duration-200 pl-10 transform ${
                    accountOpen ? "translate-y-0" : "-translate-y-2"
                  }`}
                >
                  <span className="text-sm font-medium">Financial Report</span>
                </Link>
              </div>

              <Link
                href="/dashboard/settings"
                className={`flex items-center space-x-3 p-2.5 ${
                  pathname === "/dashboard/settings"
                    ? themeStyles.activeNav
                    : themeStyles.hover + " " + themeStyles.textSecondary
                } rounded-lg transition-all duration-200`}
              >
                <Settings className="h-5 w-5" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
            </div>

            {/* Sidebar bottom padding */}
            <div className="py-4"></div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
        </div>
      </div>
    </NotificationsProvider>
  )
}
