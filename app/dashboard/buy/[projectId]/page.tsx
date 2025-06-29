"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  ShoppingCart,
  ChevronDown,
  ArrowLeft,
  Plus,
  Minus,
  Share2,
  Bookmark,
  HelpCircle,
  Info,
  Clock,
  MapPin,
  BarChart3,
  ShieldCheck,
  Calendar,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProjectById } from "@/lib/services/project-service"
import { useAuth } from "@/lib/context/auth-context"
import { processInvestment } from "./actions"
import type { Project } from "@/lib/types/database"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"

export default function BuyPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const projectId = params.projectId as string

  const [theme, setTheme] = useState("dark")
  const [quantity, setQuantity] = useState(0)
  const [activeTab, setActiveTab] = useState("buy")
  const [showTooltip, setShowTooltip] = useState("")
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // State for saved projects
  const [isSaved, setIsSaved] = useState(false)

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true)
      try {
        const projectData = await getProjectById(projectId)
        if (projectData) {
          setProject(projectData)
        } else {
          setError("Project not found")
        }
      } catch (err) {
        console.error("Error fetching project:", err)
        setError("Failed to load project data")
      } finally {
        setLoading(false)
      }
    }

    if (projectId) {
      fetchProject()
    }
  }, [projectId])

  // Check if project is saved on initial load
  useEffect(() => {
    if (project) {
      const savedProjects = JSON.parse(localStorage.getItem("savedProjects") || "[]")
      setIsSaved(savedProjects.some((id) => id === project.id))
    }
  }, [project])

  // Apply theme to document body
  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-theme" : "light-theme"
  }, [theme])

  // Handle save project
  const handleSaveProject = () => {
    if (!project) return

    const savedProjects = JSON.parse(localStorage.getItem("savedProjects") || "[]")

    if (isSaved) {
      // Remove from saved projects
      const updatedProjects = savedProjects.filter((id) => id !== project.id)
      localStorage.setItem("savedProjects", JSON.stringify(updatedProjects))
      setIsSaved(false)
      toast({
        title: "Project removed",
        description: `${project.name} has been removed from your watchlist`,
        variant: "default",
      })
    } else {
      // Add to saved projects
      savedProjects.push(project.id)
      localStorage.setItem("savedProjects", JSON.stringify(savedProjects))
      setIsSaved(true)
      toast({
        title: "Project saved",
        description: `${project.name} has been added to your watchlist`,
        variant: "default",
      })
    }
  }

  // Handle share project
  const handleShareProject = async () => {
    if (!project) return

    const shareUrl = `${window.location.origin}/dashboard/buy/${project.id}`
    const shareTitle = `Check out ${project.name} on Centace Investment Platform`
    const shareText = `I found this interesting investment opportunity: ${project.name}. Expected returns: ${project.expected_returns || "15-18%"}`

    // Try to use Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        })
        toast({
          title: "Shared successfully",
          description: "Project has been shared",
          variant: "default",
        })
      } catch (error) {
        console.error("Error sharing:", error)
        // Fallback to clipboard if sharing fails
        copyToClipboard(shareUrl)
      }
    } else {
      // Fallback to clipboard if Web Share API not available
      copyToClipboard(shareUrl)
    }
  }

  // Helper function to copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Link copied",
          description: "Project link has been copied to clipboard",
          variant: "default",
        })
      })
      .catch((err) => {
        console.error("Failed to copy:", err)
        toast({
          title: "Failed to copy",
          description: "Could not copy the link to clipboard",
          variant: "destructive",
        })
      })
  }

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Increment/decrement quantity
  const incrementQuantity = () => {
    if (project && quantity < project.available_shares) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  // Calculate total cost
  const totalCost = project ? quantity * project.price_per_share : 0
  // Calculate service fee (5% of total cost)
  const serviceFee = totalCost * 0.05
  // Calculate final total with service fee
  const finalTotal = totalCost + serviceFee

  // Handle investment submission
  const handleInvestment = async (e) => {
    e.preventDefault()

    if (!user) {
      router.push("/login")
      return
    }

    if (!project || quantity <= 0) {
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("projectId", project.id)
      formData.append("shares", quantity.toString())
      formData.append("amount", totalCost.toString())
      formData.append("serviceFee", serviceFee.toString())
      formData.append("totalAmount", finalTotal.toString())

      // Call the server action but don't catch redirect errors
      await processInvestment(formData)

      // If we get here (no redirect occurred), manually redirect
      router.push("/dashboard/portfolio")
    } catch (err) {
      // Check if this is a redirect error (this is a Next.js internal error type)
      if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) {
        // This is a redirect error, let it propagate
        throw err
      }

      // Handle regular errors
      console.error("Error processing investment:", err)
      setError("Failed to process your investment. Please try again.")
      setIsSubmitting(false)
    }
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

  if (loading) {
    return (
      <div className={`min-h-screen ${themeStyles.background} ${themeStyles.text} flex items-center justify-center`}>
        <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-t-blue-500 animate-spin"></div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className={`min-h-screen ${themeStyles.background} ${themeStyles.text} p-6`}>
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            className={`${themeStyles.textSecondary} hover:${themeStyles.text} transition-colors duration-200 -ml-2 mb-4`}
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to projects
          </Button>

          <div
            className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border}`}
          >
            <div className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-xl font-bold mb-2">Error Loading Project</h2>
              <p className={`${themeStyles.textSecondary} mb-6`}>{error || "Project not found"}</p>
              <Button onClick={() => router.push("/dashboard/discover")}>Browse Other Projects</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${themeStyles.background} ${themeStyles.text} font-sans antialiased`}>
      {/* Main Content */}
      <div className="flex">
        {/* Main Dashboard Content */}
        <main className={`flex-1 p-6 ${themeStyles.background} overflow-auto`}>
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Back Button */}
            <div className="mb-4">
              <Button
                variant="ghost"
                size="sm"
                className={`${themeStyles.textSecondary} hover:${themeStyles.text} transition-colors duration-200 -ml-2`}
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to projects
              </Button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-800 mb-6">
              <div className="flex space-x-8">
                <button
                  className={`py-3 px-1 font-medium text-sm border-b-2 ${
                    activeTab === "buy"
                      ? "border-blue-500 text-blue-500"
                      : "border-transparent " + themeStyles.textSecondary
                  } transition-colors duration-200`}
                  onClick={() => setActiveTab("buy")}
                >
                  BUY
                </button>
                <Link
                  href="/dashboard/funding"
                  className={`py-3 px-1 font-medium text-sm ${themeStyles.textSecondary} hover:${themeStyles.text} transition-colors duration-200`}
                >
                  Deposit
                </Link>
                <div className="flex-grow"></div>
                <Link
                  href="/dashboard/orders"
                  className={`py-3 px-1 font-medium text-sm flex items-center ${themeStyles.textSecondary} hover:${themeStyles.text} transition-colors duration-200`}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className={`py-3 px-1 font-medium text-sm flex items-center ${themeStyles.textSecondary} hover:${themeStyles.text} transition-colors duration-200`}
                >
                  <HelpCircle className="h-4 w-4 mr-1" />
                  FAQ
                </Link>
              </div>
            </div>

            {/* Error message if any */}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Project Image and Info - Left Column */}
              <div className="md:col-span-2 space-y-6">
                {/* Project Header */}
                <div
                  className={`${themeStyles.backgroundCard} rounded-xl overflow-hidden ${themeStyles.shadow} border ${themeStyles.border}`}
                >
                  <div className="h-64 bg-gradient-to-r from-amber-500 to-orange-500 relative">
                    {project.image_url && (
                      <img
                        src={project.image_url || "/placeholder.svg"}
                        alt={project.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                      <div className="relative z-10 text-center">
                        <h1 className="text-3xl font-bold text-white mb-2">{project.name}</h1>
                        <div className="flex items-center justify-center space-x-3">
                          <span className="px-3 py-1 bg-black bg-opacity-30 rounded-full text-white text-sm">
                            {project.category}
                          </span>
                          <span className="px-3 py-1 bg-black bg-opacity-30 rounded-full text-white text-sm flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {project.location || "Ghana"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center">
                          <h2 className="text-xl font-bold">{project.name}</h2>
                          <div
                            className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                              theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"
                            }`}
                          >
                            {project.status}
                          </div>
                        </div>
                        <p className={`text-sm ${themeStyles.textTertiary} mt-1`}>{project.description}</p>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-[#21262d]" : "bg-gray-50"}`}>
                        <div className="flex items-center mb-1">
                          <Clock className="h-4 w-4 mr-2 text-blue-400" />
                          <p className={`text-sm font-medium`}>Maturity Period</p>
                        </div>
                        <p className="text-lg font-bold">{project.maturity_period || "12 weeks"}</p>
                      </div>
                      <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-[#21262d]" : "bg-gray-50"}`}>
                        <div className="flex items-center mb-1">
                          <BarChart3 className="h-4 w-4 mr-2 text-green-400" />
                          <p className={`text-sm font-medium`}>Expected Returns</p>
                        </div>
                        <p className="text-lg font-bold text-green-500">{project.expected_returns || "15-18%"}</p>
                      </div>
                      <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-[#21262d]" : "bg-gray-50"}`}>
                        <div className="flex items-center mb-1">
                          <ShieldCheck className="h-4 w-4 mr-2 text-amber-400" />
                          <p className={`text-sm font-medium`}>Risk Level</p>
                        </div>
                        <p className="text-lg font-bold text-amber-500">{project.risk_level || "Medium"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Features */}
                <div
                  className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border}`}
                >
                  <h3 className="text-lg font-bold mb-4">Project Features</h3>
                  <ul className="space-y-3">
                    {project.features ? (
                      Array.isArray(project.features) ? (
                        project.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center mt-0.5 mr-3">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            </div>
                            <span className={`${themeStyles.textSecondary}`}>{feature}</span>
                          </li>
                        ))
                      ) : (
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center mt-0.5 mr-3">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          </div>
                          <span className={`${themeStyles.textSecondary}`}>
                            Modern facilities and efficient management practices
                          </span>
                        </li>
                      )
                    ) : (
                      <>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center mt-0.5 mr-3">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          </div>
                          <span className={`${themeStyles.textSecondary}`}>
                            Modern facilities and efficient management practices
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center mt-0.5 mr-3">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          </div>
                          <span className={`${themeStyles.textSecondary}`}>
                            Automated systems for improved productivity
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center mt-0.5 mr-3">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          </div>
                          <span className={`${themeStyles.textSecondary}`}>Direct market access arrangements</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Project Timeline */}
                <div
                  className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border}`}
                >
                  <h3 className="text-lg font-bold mb-4">Project Timeline</h3>
                  <div className="space-y-6">
                    {project.timeline ? (
                      Array.isArray(project.timeline) ? (
                        project.timeline.map((phase, index) => (
                          <div key={index} className="relative">
                            {index < project.timeline.length - 1 && (
                              <div className="absolute top-6 left-3 bottom-0 w-0.5 bg-gray-700"></div>
                            )}
                            <div className="flex items-start">
                              <div
                                className={`h-6 w-6 rounded-full flex items-center justify-center mt-0.5 mr-4 ${
                                  phase.status === "Completed"
                                    ? "bg-green-500"
                                    : phase.status === "In Progress"
                                      ? "bg-blue-500"
                                      : "bg-gray-700"
                                }`}
                              >
                                <div className="h-2 w-2 rounded-full bg-white"></div>
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                  <h4 className="font-medium">{phase.phase}</h4>
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                      phase.status === "Completed"
                                        ? "bg-green-900/30 text-green-400"
                                        : phase.status === "In Progress"
                                          ? "bg-blue-900/30 text-blue-400"
                                          : "bg-gray-700/30 text-gray-400"
                                    }`}
                                  >
                                    {phase.status}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                                  <span className={`text-sm ${themeStyles.textTertiary}`}>{phase.duration}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <p className={themeStyles.textTertiary}>Timeline information not available</p>
                        </div>
                      )
                    ) : (
                      <>
                        <div className="relative">
                          <div className="absolute top-6 left-3 bottom-0 w-0.5 bg-gray-700"></div>
                          <div className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5 mr-4">
                              <div className="h-2 w-2 rounded-full bg-white"></div>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-medium">Setup</h4>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-900/30 text-green-400">
                                  Completed
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                                <span className={`text-sm ${themeStyles.textTertiary}`}>2 weeks</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute top-6 left-3 bottom-0 w-0.5 bg-gray-700"></div>
                          <div className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mt-0.5 mr-4">
                              <div className="h-2 w-2 rounded-full bg-white"></div>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-medium">Initial Operations</h4>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-400">
                                  In Progress
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                                <span className={`text-sm ${themeStyles.textTertiary}`}>4 weeks</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center mt-0.5 mr-4">
                              <div className="h-2 w-2 rounded-full bg-white"></div>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-medium">Scaling</h4>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700/30 text-gray-400">
                                  Upcoming
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                                <span className={`text-sm ${themeStyles.textTertiary}`}>6 weeks</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Read More Section */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">
                    Read more: <span className="text-amber-500 font-bold">{project.name}</span>
                  </h3>
                  <div className="h-64 bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <h4 className="text-xl font-medium mb-2">Here is where More explanation</h4>
                      <p>on individual project is been highlighted</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Panel - Right Column */}
              <div className="md:col-span-1 space-y-6">
                <div
                  className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border} sticky top-20`}
                >
                  <h3 className="text-lg font-bold mb-6">Order Details</h3>

                  {/* Share Selection */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Selected</label>
                      <div className="relative">
                        <button
                          className={`flex items-center space-x-1 px-3 py-1 ${themeStyles.backgroundTertiary} rounded-lg border ${themeStyles.border} text-sm font-medium`}
                        >
                          <span>Shares</span>
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className={`flex items-center border ${themeStyles.border} rounded-lg overflow-hidden`}>
                      <button
                        className={`p-3 ${themeStyles.backgroundTertiary} ${themeStyles.border} ${
                          quantity === 0 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={decrementQuantity}
                        disabled={quantity === 0}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        className={`flex-1 bg-transparent text-center p-2 focus:outline-none ${themeStyles.text}`}
                        value={quantity}
                        onChange={(e) => {
                          const val = Number.parseInt(e.target.value)
                          if (!isNaN(val) && val >= 0 && val <= project.available_shares) {
                            setQuantity(val)
                          }
                        }}
                        min="0"
                        max={project.available_shares}
                      />
                      <button
                        className={`p-3 ${themeStyles.backgroundTertiary} ${themeStyles.border} ${
                          quantity >= project.available_shares ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={incrementQuantity}
                        disabled={quantity >= project.available_shares}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className={`text-xs ${themeStyles.textTertiary}`}>Min: {project.min_investment}</span>
                      <span className={`text-xs ${themeStyles.textTertiary}`}>
                        Available: {project.available_shares}
                      </span>
                    </div>
                  </div>

                  {/* Total Cost */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Total Cost</label>
                      <div className="relative">
                        <div
                          className="cursor-help"
                          onMouseEnter={() => setShowTooltip("cost")}
                          onMouseLeave={() => setShowTooltip("")}
                        >
                          <Info className="h-4 w-4 text-gray-500" />
                          {showTooltip === "cost" && (
                            <div className="absolute right-0 bottom-6 w-48 p-2 bg-gray-800 rounded text-xs text-white z-10">
                              Total cost is calculated as price per share multiplied by quantity
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-800 bg-opacity-30 rounded-lg">
                      <span className="text-lg font-bold">{totalCost.toLocaleString()}</span>
                      <span className="text-sm font-medium">GHC</span>
                    </div>
                  </div>

                  {/* Service Fee */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Service Fee (5%)</label>
                      <div className="relative">
                        <div
                          className="cursor-help"
                          onMouseEnter={() => setShowTooltip("fee")}
                          onMouseLeave={() => setShowTooltip("")}
                        >
                          <Info className="h-4 w-4 text-gray-500" />
                          {showTooltip === "fee" && (
                            <div className="absolute right-0 bottom-6 w-64 p-2 bg-gray-800 rounded text-xs text-white z-10">
                              A 5% non-refundable service fee is applied to all investments
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-800 bg-opacity-30 rounded-lg">
                      <span className="text-lg font-bold">{serviceFee.toLocaleString()}</span>
                      <span className="text-sm font-medium">GHC</span>
                    </div>
                    <p className="text-xs text-amber-500 mt-1">* This fee is non-refundable</p>
                  </div>

                  {/* Final Total */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Final Total</label>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-900 bg-opacity-20 rounded-lg border border-green-800">
                      <span className="text-lg font-bold">{finalTotal.toLocaleString()}</span>
                      <span className="text-sm font-medium">GHC</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <form onSubmit={handleInvestment}>
                      <input type="hidden" name="projectId" value={project.id} />
                      <input type="hidden" name="shares" value={quantity} />
                      <input type="hidden" name="amount" value={totalCost} />
                      <input type="hidden" name="serviceFee" value={serviceFee} />
                      <input type="hidden" name="totalAmount" value={finalTotal} />

                      <Button
                        type="submit"
                        className={`w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 font-medium ${
                          quantity === 0 || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={quantity === 0 || isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Confirm Order"}
                      </Button>
                    </form>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        className={`flex-1 py-2 ${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} rounded-lg transition-all duration-200 font-medium ${
                          isSaved ? "bg-amber-900/20 border-amber-700 text-amber-500" : ""
                        }`}
                        onClick={handleSaveProject}
                      >
                        <Bookmark className={`h-4 w-4 mr-2 ${isSaved ? "fill-amber-500" : ""}`} />
                        {isSaved ? "Saved" : "Save"}
                      </Button>
                      <Button
                        variant="outline"
                        className={`flex-1 py-2 ${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} rounded-lg transition-all duration-200 font-medium`}
                        onClick={handleShareProject}
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
