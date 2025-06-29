"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronUp, Info, AlertCircle, Check, X, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { getProjects, getProjectsByCategory } from "@/lib/services/project-service"
import type { Project } from "@/lib/types/database"
import { useTheme } from "@/components/theme-provider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DiscoverPage() {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme || "dark"
  const [expandedSections, setExpandedSections] = useState({
    silver: true,
    gold: true,
    diamond: true,
  })
  const [activeCategory, setActiveCategory] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [watchlistDialogOpen, setWatchlistDialogOpen] = useState(false)
  const [watchlistedProjects, setWatchlistedProjects] = useState<number[]>([])

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      try {
        const allProjects = await getProjects()
        setProjects(allProjects)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Filter projects by category when activeCategory changes
  useEffect(() => {
    const fetchProjectsByCategory = async () => {
      setLoading(true)
      try {
        const categories = [
          "Agriculture",
          "Industrialization",
          "Services",
          "Technology",
          "Transportation",
          "Entertainment",
          "Real Estate",
        ]

        if (activeCategory > 0 && activeCategory <= categories.length) {
          const categoryProjects = await getProjectsByCategory(categories[activeCategory - 1])
          setProjects(categoryProjects)
        } else {
          const allProjects = await getProjects()
          setProjects(allProjects)
        }
      } catch (error) {
        console.error("Error fetching projects by category:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjectsByCategory()
  }, [activeCategory])

  // Load watchlisted projects from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlistedProjects")
    if (savedWatchlist) {
      try {
        setWatchlistedProjects(JSON.parse(savedWatchlist))
      } catch (error) {
        console.error("Error parsing watchlist from localStorage:", error)
      }
    }
  }, [])

  // Function to toggle project in watchlist
  const toggleWatchlist = (projectId: number) => {
    setWatchlistedProjects((prev) => {
      const newWatchlist = prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]

      // Save to localStorage
      localStorage.setItem("watchlistedProjects", JSON.stringify(newWatchlist))
      return newWatchlist
    })
  }

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  // Filter projects by tier
  const getProjectsByTierLocal = (tier: string) => {
    return projects.filter((project) => project.tier.toLowerCase() === tier.toLowerCase())
  }

  // Completely revised themeStyles object with proper light mode values
  const themeStyles = {
    // Backgrounds
    background: theme === "dark" ? "bg-[#0a0a0f]" : "bg-gray-50",
    backgroundSecondary: theme === "dark" ? "bg-[#0d1117]" : "bg-white",
    backgroundTertiary: theme === "dark" ? "bg-[#161b22]" : "bg-gray-100",
    backgroundCard: theme === "dark" ? "bg-[#1a1d24]" : "bg-white",

    // Text colors
    text: theme === "dark" ? "text-white" : "text-gray-900",
    textSecondary: theme === "dark" ? "text-gray-300" : "text-gray-600",
    textTertiary: theme === "dark" ? "text-gray-400" : "text-gray-500",

    // Borders
    border: theme === "dark" ? "border-gray-800" : "border-gray-200",
    borderSecondary: theme === "dark" ? "border-gray-700" : "border-gray-300",

    // Interactive states
    hover: theme === "dark" ? "hover:bg-[#21262d]" : "hover:bg-gray-100",
    activeNav: theme === "dark" ? "bg-[#21262d]" : "bg-blue-50 text-blue-600",

    // Effects
    shadow: theme === "dark" ? "shadow-[0_4px_12px_rgba(0,0,0,0.3)]" : "shadow-[0_4px_12px_rgba(0,0,0,0.05)]",

    // Accent colors
    accent: theme === "dark" ? "text-blue-400" : "text-blue-600",
    accentBg: theme === "dark" ? "bg-blue-900/20" : "bg-blue-50",

    // Form elements
    input: theme === "dark" ? "bg-[#21262d] text-white" : "bg-white text-gray-900 border-gray-300",

    // Section backgrounds
    sectionHeader: theme === "dark" ? "bg-gray-900/30 border-gray-800" : "bg-gray-100 border-gray-200",
    silverHeader: theme === "dark" ? "bg-gray-900/30 border-gray-800" : "bg-gray-100 border-gray-200",
    goldHeader: theme === "dark" ? "bg-yellow-900/20 border-yellow-900/30" : "bg-yellow-50 border-yellow-200",
    diamondHeader: theme === "dark" ? "bg-blue-900/20 border-blue-900/30" : "bg-blue-50 border-blue-200",

    // Toggle buttons
    silverToggle:
      theme === "dark"
        ? "bg-gray-900/20 hover:bg-gray-900/40 border-gray-800"
        : "bg-gray-50 hover:bg-gray-100 border-gray-200",
    goldToggle:
      theme === "dark"
        ? "bg-yellow-900/10 hover:bg-yellow-900/20 border-yellow-900/30"
        : "bg-yellow-50 hover:bg-yellow-100 border-yellow-200",
    diamondToggle:
      theme === "dark"
        ? "bg-blue-900/10 hover:bg-blue-900/20 border-blue-900/30"
        : "bg-blue-50 hover:bg-blue-100 border-blue-200",

    // Text colors for specific elements
    silverText: theme === "dark" ? "text-gray-400" : "text-gray-600",
    goldText: theme === "dark" ? "text-yellow-500" : "text-yellow-600",
    diamondText: theme === "dark" ? "text-blue-400" : "text-blue-600",

    // Icon colors
    silverIcon: theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700",
    goldIcon: theme === "dark" ? "text-yellow-500 hover:text-yellow-400" : "text-yellow-600 hover:text-yellow-700",
    diamondIcon: theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700",
  }

  // Get tier badge styles
  const getTierBadgeStyles = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "silver":
        return {
          bg: theme === "dark" ? "bg-gray-800" : "bg-gray-200",
          text: theme === "dark" ? "text-gray-300" : "text-gray-700",
          border: theme === "dark" ? "border-gray-700" : "border-gray-300",
          icon: (
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 4L4 8L12 12L20 8L12 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        }
      case "gold":
        return {
          bg: theme === "dark" ? "bg-yellow-900/30" : "bg-yellow-100",
          text: theme === "dark" ? "text-yellow-500" : "text-yellow-700",
          border: theme === "dark" ? "border-yellow-800/30" : "border-yellow-300",
          icon: (
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 6L7 10L12 14L17 10L12 6Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        }
      case "diamond":
        return {
          bg: theme === "dark" ? "bg-blue-900/30" : "bg-blue-100",
          text: theme === "dark" ? "text-blue-400" : "bg-blue-700",
          border: theme === "dark" ? "border-blue-800/30" : "border-blue-300",
          icon: (
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 10L12 4L19 10L12 20L5 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        }
      default:
        return {
          bg: "bg-gray-800",
          text: "text-gray-300",
          border: "border-gray-700",
          icon: null,
        }
    }
  }

  // Render project card
  const renderProjectCard = (project: Project) => {
    const statusColor =
      project.status === "Available"
        ? "bg-green-500 text-white"
        : project.status === "Limited"
          ? "bg-yellow-500 text-black"
          : "bg-red-500 text-white"

    const tierColor =
      project.tier === "Silver"
        ? "bg-yellow-500 hover:bg-yellow-600 text-black"
        : project.tier === "Gold"
          ? "bg-yellow-500 hover:bg-yellow-600 text-black"
          : "bg-blue-600 hover:bg-blue-700 text-white"

    const tierStyles = getTierBadgeStyles(project.tier)

    return (
      <div
        key={project.id}
        className={`rounded-lg border ${themeStyles.border} overflow-hidden ${themeStyles.backgroundCard}`}
      >
        <div className="relative">
          <img
            src={project.image_url || "/placeholder.svg?height=150&width=300"}
            alt={project.name}
            className="w-full h-40 object-cover"
          />
          <Badge className={`absolute top-2 right-2 ${statusColor}`} variant="secondary">
            {project.status}
          </Badge>
          <div className="absolute top-2 left-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full bg-black/30 hover:bg-black/50 text-white"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleWatchlist(project.id)
              }}
            >
              {watchlistedProjects.includes(project.id) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              )}
            </Button>
          </div>
          {/* Tier Badge */}
          <div className="absolute bottom-2 left-2">
            <div
              className={`flex items-center px-2 py-1 rounded text-xs font-medium ${tierStyles.bg} ${tierStyles.text} border ${tierStyles.border}`}
            >
              {tierStyles.icon}
              {project.tier}
            </div>
          </div>
        </div>
        <div className="p-4">
          <h4 className={`font-bold mb-1 ${themeStyles.text}`}>{project.name}</h4>
          <p className="text-sm text-gray-400 mb-3">{project.farming_company || "Centace Investments"}</p>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className={themeStyles.textTertiary}>Cost per Share:</span>
              <span className={`font-medium ${themeStyles.text}`}>{project.price_per_share.toLocaleString()} GH₵</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={themeStyles.textTertiary}>Est. ROI:</span>
              <span className="text-green-500 font-medium">{project.expected_returns}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={themeStyles.textTertiary}>Funding Period:</span>
              <span className={`font-medium ${themeStyles.text}`}>
                {project.funding_start_date && project.funding_end_date
                  ? `${new Date(project.funding_start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${new Date(project.funding_end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                  : "Ongoing"}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              {project.category}
            </Badge>
            <Link href={`/dashboard/buy/${project.id}`}>
              <Button className={`px-4 py-1 h-8 ${tierColor} font-medium rounded-lg transition-colors duration-200`}>
                BUY
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Render watchlist dialog content with tier grouping
  const renderWatchlistContent = () => {
    if (watchlistedProjects.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400 mb-4"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <h3 className={`text-xl font-bold ${themeStyles.text} mb-2`}>Your watchlist is empty</h3>
          <p className={`${themeStyles.textTertiary} text-center max-w-md mb-4`}>
            Save projects to your watchlist by clicking the bookmark icon on any project card.
          </p>
        </div>
      )
    }

    // Get watchlisted projects
    const watchlistedProjectsData = projects.filter((project) => watchlistedProjects.includes(project.id))

    // Group projects by tier
    const silverProjects = watchlistedProjectsData.filter((project) => project.tier.toLowerCase() === "silver")
    const goldProjects = watchlistedProjectsData.filter((project) => project.tier.toLowerCase() === "gold")
    const diamondProjects = watchlistedProjectsData.filter((project) => project.tier.toLowerCase() === "diamond")

    return (
      <div className="space-y-6">
        {/* Silver Tier Projects */}
        {silverProjects.length > 0 && (
          <div>
            <div className="flex items-center mb-3">
              <svg
                className={`w-4 h-4 mr-2 ${themeStyles.silverText}`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L4 8L12 12L20 8L12 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className={`font-medium ${themeStyles.silverText}`}>Silver Tier Projects</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {silverProjects.map((project) => renderProjectCard(project))}
            </div>
          </div>
        )}

        {/* Gold Tier Projects */}
        {goldProjects.length > 0 && (
          <div>
            <div className="flex items-center mb-3">
              <svg
                className={`w-4 h-4 mr-2 ${themeStyles.goldText}`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6L7 10L12 14L17 10L12 6Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className={`font-medium ${themeStyles.goldText}`}>Gold Tier Projects</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goldProjects.map((project) => renderProjectCard(project))}
            </div>
          </div>
        )}

        {/* Diamond Tier Projects */}
        {diamondProjects.length > 0 && (
          <div>
            <div className="flex items-center mb-3">
              <svg
                className={`w-4 h-4 mr-2 ${themeStyles.diamondText}`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 10L12 4L19 10L12 20L5 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className={`font-medium ${themeStyles.diamondText}`}>Diamond Tier Projects</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {diamondProjects.map((project) => renderProjectCard(project))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <main className={`p-6 ${themeStyles.background} overflow-auto`}>
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold tracking-tight ${themeStyles.text}`}>Discover</h1>
            <p className={`mt-1 ${themeStyles.textTertiary}`}>
              Explore investment opportunities across various sectors
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} rounded-lg transition-all duration-200 font-medium flex items-center gap-2`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Dialog open={watchlistDialogOpen} onOpenChange={setWatchlistDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className={`bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium`}
                  onClick={() => setWatchlistDialogOpen(true)}
                >
                  My Watchlist {watchlistedProjects.length > 0 && `(${watchlistedProjects.length})`}
                </Button>
              </DialogTrigger>
              <DialogContent
                className={`${themeStyles.backgroundCard} border ${themeStyles.border} max-w-4xl max-h-[80vh] overflow-y-auto`}
              >
                <DialogHeader>
                  <DialogTitle className={`text-xl font-bold ${themeStyles.text}`}>My Watchlist</DialogTitle>
                  <DialogDescription className={themeStyles.textTertiary}>
                    Projects you've saved for later
                  </DialogDescription>
                </DialogHeader>

                {renderWatchlistContent()}
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters Section (Collapsible) */}
        {showFilters && (
          <div
            className={`${themeStyles.backgroundCard} rounded-xl p-5 ${themeStyles.shadow} border ${themeStyles.border} mb-6 animate-in fade-in duration-300`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeStyles.text}`}>Investment Tier</label>
                <select
                  className={`w-full ${theme === "dark" ? "bg-[#21262d]" : "bg-gray-100"} ${themeStyles.border} rounded-lg p-2 text-sm ${themeStyles.text}`}
                >
                  <option>All Tiers</option>
                  <option>Silver</option>
                  <option>Gold</option>
                  <option>Diamond</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeStyles.text}`}>Price Range</label>
                <select
                  className={`w-full ${theme === "dark" ? "bg-[#21262d]" : "bg-gray-100"} ${themeStyles.border} rounded-lg p-2 text-sm ${themeStyles.text}`}
                >
                  <option>All Prices</option>
                  <option>Under 1,000 GH₵</option>
                  <option>1,000 - 5,000 GH₵</option>
                  <option>Over 5,000 GH₵</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeStyles.text}`}>Availability</label>
                <select
                  className={`w-full ${theme === "dark" ? "bg-[#21262d]" : "bg-gray-100"} ${themeStyles.border} rounded-lg p-2 text-sm ${themeStyles.text}`}
                >
                  <option>All</option>
                  <option>Available</option>
                  <option>Limited</option>
                  <option>Sold Out</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Investment Tiers */}
        <div
          className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border} mb-8 relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-yellow-500/10 to-transparent rounded-full blur-3xl -z-10"></div>

          <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-6">
            Investment Tiers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Silver Tier */}
            <div
              className={`relative p-5 rounded-xl border ${themeStyles.border} ${themeStyles.backgroundCard} transition-all duration-300 hover:shadow-md group overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white mr-3 shadow-md">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 4L4 8L12 12L20 8L12 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 16L12 20L20 16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 12L12 16L20 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${themeStyles.silverText}`}>Silver</h3>
                  <p className="text-xs text-gray-500">Entry level investments</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className={`flex items-center text-sm ${themeStyles.text}`}>
                  <Check className={`h-4 w-4 ${themeStyles.silverText} mr-2`} />
                  <span>Rented Land</span>
                </div>
                <div className={`flex items-center text-sm ${themeStyles.text}`}>
                  <Check className={`h-4 w-4 ${themeStyles.silverText} mr-2`} />
                  <span>Rented Tools</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <X className="h-4 w-4 text-gray-600 mr-2" />
                  <span>Ownership Rights</span>
                </div>
              </div>
            </div>

            {/* Gold Tier */}
            <div
              className={`relative p-5 rounded-xl border ${themeStyles.border} ${themeStyles.backgroundCard} transition-all duration-300 hover:shadow-md group overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-amber-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-white mr-3 shadow-md">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 6L7 10L12 14L17 10L12 6Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 14L12 18L17 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${themeStyles.goldText}`}>Gold</h3>
                  <p className="text-xs text-yellow-600/70">Mid-tier investments</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className={`flex items-center text-sm ${themeStyles.text}`}>
                  <Check className={`h-4 w-4 ${themeStyles.goldText} mr-2`} />
                  <span>Owns Land</span>
                </div>
                <div className={`flex items-center text-sm ${themeStyles.text}`}>
                  <Check className={`h-4 w-4 ${themeStyles.goldText} mr-2`} />
                  <span>Owns Tools</span>
                </div>
                <div className={`flex items-center text-sm ${themeStyles.text}`}>
                  <Check className={`h-4 w-4 ${themeStyles.goldText} mr-2`} />
                  <span>Partial Ownership Rights</span>
                </div>
              </div>
            </div>

            {/* Diamond Tier */}
            <div
              className={`relative p-5 rounded-xl border ${themeStyles.border} ${themeStyles.backgroundCard} transition-all duration-300 hover:shadow-md group overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center text-white mr-3 shadow-md">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 10L12 4L19 10L12 20L5 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${themeStyles.diamondText}`}>Diamond</h3>
                  <p className="text-xs text-blue-500/70">Premium investments</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className={`flex items-center text-sm ${themeStyles.text}`}>
                  <Check className={`h-4 w-4 ${themeStyles.diamondText} mr-2`} />
                  <span>Owns Land</span>
                </div>
                <div className={`flex items-center text-sm ${themeStyles.text}`}>
                  <Check className={`h-4 w-4 ${themeStyles.diamondText} mr-2`} />
                  <span>Owns Tools</span>
                </div>
                <div className={`flex items-center text-sm ${themeStyles.text}`}>
                  <Check className={`h-4 w-4 ${themeStyles.diamondText} mr-2`} />
                  <span>Full Ownership Rights</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discover Projects */}
        <h2 className={`text-2xl font-bold mb-6 ${themeStyles.text}`}>Discover Projects</h2>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            "Agriculture & Agribusiness",
            "Industrialization & Production",
            "Services",
            "Technology & Digital Economy",
            "Transportation & Logistics",
            "Entertainment & Media",
            "Real Estate & Construction",
          ].map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index + 1)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === index + 1
                  ? "bg-blue-600 text-white"
                  : `${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.textSecondary} hover:${themeStyles.text}`
              }`}
            >
              {index + 1}. {category.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Category Content */}
        {activeCategory === 1 && (
          <div className="mb-12 animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white font-bold mr-3 shadow-md">
                  1
                </div>
                <h3 className={`text-xl font-bold ${themeStyles.text}`}>Agriculture & Agribusiness</h3>
              </div>
              <Badge variant="outline" className="px-3 py-1 text-xs font-medium">
                7 Projects Available
              </Badge>
            </div>

            {/* Silver Projects Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <svg
                    className={`w-5 h-5 mr-2 ${themeStyles.silverText}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4L4 8L12 12L20 8L12 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 16L12 20L20 16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 12L12 16L20 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={`text-lg font-bold ${themeStyles.silverText}`}>Silver Projects</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Silver tier information</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Entry level investments with lower capital requirements</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div
                className={`${themeStyles.backgroundCard} rounded-xl overflow-hidden ${themeStyles.shadow} border ${themeStyles.border} mb-4`}
              >
                {/* Header */}
                <div className={`p-4 border-b ${themeStyles.silverHeader}`}>
                  <h3 className={`font-medium ${themeStyles.text}`}>Silver Tier Projects</h3>
                </div>

                {/* Projects Grid */}
                {expandedSections.silver && (
                  <div className="p-4">
                    {loading ? (
                      <div className="flex justify-center items-center py-12">
                        <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-t-blue-500 animate-spin"></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {getProjectsByTierLocal("silver").length > 0 ? (
                          getProjectsByTierLocal("silver").map((project) => renderProjectCard(project))
                        ) : (
                          <div className="col-span-3 py-8 text-center">
                            <p className={`${themeStyles.textTertiary}`}>
                              No silver tier projects available in this category.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Toggle Button */}
                <div
                  className={`flex justify-center p-2 border-t ${themeStyles.silverToggle} transition-colors duration-200`}
                >
                  <button onClick={() => toggleSection("silver")} className="w-full flex items-center justify-center">
                    {expandedSections.silver ? (
                      <ChevronUp className={`h-5 w-5 ${themeStyles.silverIcon} transition-colors duration-200`} />
                    ) : (
                      <ChevronDown className={`h-5 w-5 ${themeStyles.silverIcon} transition-colors duration-200`} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Gold Projects Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center"></div>
              </div>
            </div>

            {/* Gold Projects Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <svg
                    className={`w-5 h-5 mr-2 ${themeStyles.goldText}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6L7 10L12 14L17 10L12 6Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 14L12 18L17 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={`text-lg font-bold ${themeStyles.goldText}`}>Gold Projects</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Gold tier information</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Mid-tier investments with ownership benefits</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div
                className={`${themeStyles.backgroundCard} rounded-xl overflow-hidden ${themeStyles.shadow} border ${themeStyles.border} mb-4`}
              >
                {/* Header */}
                <div className={`p-4 border-b ${themeStyles.goldHeader}`}>
                  <h3 className={`font-medium ${themeStyles.text}`}>Gold Tier Projects</h3>
                </div>

                {/* Projects Grid */}
                {expandedSections.gold && (
                  <div className="p-4">
                    {loading ? (
                      <div className="flex justify-center items-center py-12">
                        <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-t-blue-500 animate-spin"></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {getProjectsByTierLocal("gold").length > 0 ? (
                          getProjectsByTierLocal("gold").map((project) => renderProjectCard(project))
                        ) : (
                          <div className="col-span-3 py-8 text-center">
                            <p className={`${themeStyles.textTertiary}`}>
                              No gold tier projects available in this category.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Toggle Button */}
                <div
                  className={`flex justify-center p-2 border-t ${themeStyles.goldToggle} transition-colors duration-200`}
                >
                  <button onClick={() => toggleSection("gold")} className="w-full flex items-center justify-center">
                    {expandedSections.gold ? (
                      <ChevronUp className={`h-5 w-5 ${themeStyles.goldIcon} transition-colors duration-200`} />
                    ) : (
                      <ChevronDown className={`h-5 w-5 ${themeStyles.goldIcon} transition-colors duration-200`} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Diamond Projects Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <svg
                    className={`w-5 h-5 mr-2 ${themeStyles.diamondText}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 10L12 4L19 10L12 20L5 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={`text-lg font-bold ${themeStyles.diamondText}`}>Diamond Projects</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Diamond tier information</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Premium investments with full ownership rights</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div
                className={`${themeStyles.backgroundCard} rounded-xl overflow-hidden ${themeStyles.shadow} border ${themeStyles.border} mb-4`}
              >
                {/* Projects Grid */}
                {expandedSections.diamond && (
                  <div className="flex justify-center items-center min-h-[200px]">
                    {loading ? (
                      <div className="flex justify-center items-center py-12">
                        <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-t-blue-500 animate-spin"></div>
                      </div>
                    ) : getProjectsByTierLocal("diamond").length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {getProjectsByTierLocal("diamond").map((project) => renderProjectCard(project))}
                      </div>
                    ) : (
                      <div className="p-12 flex flex-col justify-center items-center">
                        <AlertCircle className="h-12 w-12 text-red-500 mb-4 opacity-70" />
                        <span className={`text-xl font-bold text-red-500`}>No Project Yet</span>
                        <p className="text-sm text-gray-500 mt-2">Diamond tier projects are coming soon</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 text-blue-400 border-blue-500/30 hover:bg-blue-500/10"
                        >
                          Get Notified
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Toggle Button */}
                <div
                  className={`flex justify-center p-2 border-t ${themeStyles.diamondToggle} transition-colors duration-200`}
                >
                  <button onClick={() => toggleSection("diamond")} className="w-full flex items-center justify-center">
                    {expandedSections.diamond ? (
                      <ChevronUp className={`h-5 w-5 ${themeStyles.diamondIcon} transition-colors duration-200`} />
                    ) : (
                      <ChevronDown className={`h-5 w-5 ${themeStyles.diamondIcon} transition-colors duration-200`} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeCategory === 2 && (
          <div className="mb-12 animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center text-white font-bold mr-3 shadow-md">
                  2
                </div>
                <h3 className={`text-xl font-bold ${themeStyles.text}`}>Industrialization & Production</h3>
              </div>
              <Badge variant="outline" className="px-3 py-1 text-xs font-medium">
                4 Projects Available
              </Badge>
            </div>

            <div
              className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Project 1 */}
                <div
                  className={`rounded-lg border ${themeStyles.border} ${themeStyles.backgroundCard} overflow-hidden`}
                >
                  <div className="relative">
                    <img
                      src="/placeholder.svg?height=150&width=300"
                      alt="Manufacturing Plant"
                      className="w-full h-40 object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500 text-white" variant="secondary">
                      Available
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h4 className={`font-bold mb-1 ${themeStyles.text}`}>Manufacturing Plant</h4>
                    <p className="text-sm text-gray-400 mb-3">Industrial Ventures Ltd</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className={themeStyles.textTertiary}>Cost per Share:</span>
                        <span className={`font-medium ${themeStyles.text}`}>2500.00 GH₵</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={themeStyles.textTertiary}>Est. ROI:</span>
                        <span className="text-green-500 font-medium">18%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={themeStyles.textTertiary}>Funding Period:</span>
                        <span className={`font-medium ${themeStyles.text}`}>Jun 15 - Aug 15</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                        Industrial
                      </Badge>
                      <Link href="/dashboard/buy/manufacturing-plant">
                        <Button className="px-4 py-1 h-8 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200">
                          BUY
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Project 2 */}
                <div
                  className={`rounded-lg border ${themeStyles.border} ${themeStyles.backgroundCard} overflow-hidden`}
                >
                  <div className="relative">
                    <img
                      src="/placeholder.svg?height=150&width=300"
                      alt="Food Processing"
                      className="w-full h-40 object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-yellow-500 text-black" variant="secondary">
                      Limited
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h4 className={`font-bold mb-1 ${themeStyles.text}`}>Food Processing</h4>
                    <p className="text-sm text-gray-400 mb-3">Industrial Ventures Ltd</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className={themeStyles.textTertiary}>Cost per Share:</span>
                        <span className={`font-medium ${themeStyles.text}`}>2000.00 GH₵</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={themeStyles.textTertiary}>Est. ROI:</span>
                        <span className="text-green-500 font-medium">20%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={themeStyles.textTertiary}>Funding Period:</span>
                        <span className={`font-medium ${themeStyles.text}`}>May 20 - Jul 20</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-yellow-500 font-medium">3/10 shares left</span>
                      <Link href="/dashboard/buy/food-processing">
                        <Button className="px-4 py-1 h-8 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200">
                          BUY
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other categories remain the same structure but with updated theme classes */}
        {/* ... */}
      </div>
    </main>
  )
}
