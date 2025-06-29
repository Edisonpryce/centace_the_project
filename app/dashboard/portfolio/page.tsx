"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Play,
  ImageIcon,
  Share,
  MessageSquare,
  Eye,
  Send,
  ChevronDown,
  ChevronUp,
  Heart,
  X,
  Bell,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogClose } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/context/auth-context"
import { getUserInvestments } from "@/lib/services/investment-service"
import { useTheme } from "@/components/theme-provider"
import { NotificationProvider } from "@/lib/context/notification-context"
import { NotificationDropdown } from "@/components/notification-dropdown"
import { useNotification } from "@/lib/context/notification-context"

// Mock comments data
const commentsData = {
  1: [
    {
      id: 1,
      user: {
        name: "Emma R.",
        avatar: "/placeholder.svg?key=user1",
      },
      text: "This is fantastic progress! How is the irrigation system performing so far?",
      timestamp: "1 day ago",
    },
    {
      id: 2,
      user: {
        name: "Michael T.",
        avatar: "/placeholder.svg?key=user2",
      },
      text: "Looking forward to seeing the harvest results. Keep up the good work!",
      timestamp: "2 days ago",
    },
  ],
  2: [
    {
      id: 3,
      user: {
        name: "Sophia L.",
        avatar: "/placeholder.svg?key=user3",
      },
      text: "What model tractors are these? They look very efficient.",
      timestamp: "3 days ago",
    },
  ],
  3: [
    {
      id: 4,
      user: {
        name: "Daniel K.",
        avatar: "/placeholder.svg?key=user4",
      },
      text: "The new office looks great! Is there room for expansion as the team grows?",
      timestamp: "4 days ago",
    },
    {
      id: 5,
      user: {
        name: "Jessica M.",
        avatar: "/placeholder.svg?key=user5",
      },
      text: "I've visited that tech district, it's a great location for startups.",
      timestamp: "5 days ago",
    },
  ],
  101: [
    {
      id: 6,
      user: {
        name: "Robert J.",
        avatar: "/placeholder.svg?key=user6",
      },
      text: "What's the expected completion date for this project?",
      timestamp: "1 day ago",
    },
  ],
  102: [
    {
      id: 7,
      user: {
        name: "Lisa N.",
        avatar: "/placeholder.svg?key=user7",
      },
      text: "This is an amazing sustainable energy project. What's the expected output capacity?",
      timestamp: "2 days ago",
    },
    {
      id: 8,
      user: {
        name: "Thomas W.",
        avatar: "/placeholder.svg?key=user8",
      },
      text: "Are there plans to expand this to other regions?",
      timestamp: "3 days ago",
    },
  ],
}

// Mock data for user's investment updates
const userInvestmentUpdates = [
  {
    id: 1,
    projectName: "Agriculture Project",
    mediaType: "video",
    mediaUrl: "/agricultural-investment.png",
    content: "This week we've completed planting in the eastern section and started irrigation setup.",
    timestamp: "2 days ago",
    user: {
      name: "John D.",
      avatar: "/placeholder.svg?key=avatar1",
    },
    stats: {
      views: 24,
      comments: 2,
      likes: 0,
    },
  },
  {
    id: 2,
    projectName: "Agriculture Project",
    mediaType: "image",
    mediaUrl: "/expansive-solar-farm.png",
    content: "Our new tractors have arrived and are being prepared for the upcoming harvest season.",
    timestamp: "4 days ago",
    user: {
      name: "Sarah M.",
      avatar: "/placeholder.svg?key=avatar2",
    },
    stats: {
      views: 18,
      comments: 1,
      likes: 0,
    },
  },
  {
    id: 3,
    projectName: "Technology Startup",
    mediaType: "image",
    mediaUrl: "/tech-startup-office.png",
    content: "We've moved into our new office space in Accra's tech district.",
    timestamp: "5 days ago",
    user: {
      name: "David K.",
      avatar: "/placeholder.svg?key=avatar3",
    },
    stats: {
      views: 42,
      comments: 2,
      likes: 0,
    },
  },
]

// Mock data for all Centace projects
const allCentaceProjects = [
  {
    id: 101,
    projectName: "Real Estate Development",
    mediaType: "video",
    mediaUrl: "/centace-investment-platform.png",
    content: "Construction has begun on our new residential complex in Lagos. Foundation work is 40% complete.",
    timestamp: "1 day ago",
    user: {
      name: "Centace Dev",
      avatar: "/placeholder.svg?key=centace1",
    },
    stats: {
      views: 156,
      comments: 1,
      likes: 0,
    },
  },
  {
    id: 102,
    projectName: "Renewable Energy",
    mediaType: "image",
    mediaUrl: "/expansive-solar-farm.png",
    content: "Our solar farm project has reached 75% completion. Expected to go online next month.",
    timestamp: "3 days ago",
    user: {
      name: "Energy Team",
      avatar: "/placeholder.svg?key=centace2",
    },
    stats: {
      views: 89,
      comments: 2,
      likes: 0,
    },
  },
  {
    id: 103,
    projectName: "Tech Incubator",
    mediaType: "image",
    mediaUrl: "/tech-startup-office.png",
    content: "Five new startups have joined our incubator program this month. Total portfolio now at 23 companies.",
    timestamp: "6 days ago",
    user: {
      name: "Innovation Hub",
      avatar: "/placeholder.svg?key=centace3",
    },
    stats: {
      views: 211,
      comments: 0,
      likes: 0,
    },
  },
  {
    id: 104,
    projectName: "Agricultural Expansion",
    mediaType: "video",
    mediaUrl: "/agricultural-investment.png",
    content: "New irrigation systems installed across 2,000 hectares of farmland in Ghana's northern region.",
    timestamp: "1 week ago",
    user: {
      name: "Agri Division",
      avatar: "/placeholder.svg?key=centace4",
    },
    stats: {
      views: 178,
      comments: 0,
      likes: 0,
    },
  },
]

// Comment component
const CommentSection = ({ updateId, themeStyles, onNewComment }) => {
  const [comments, setComments] = useState(commentsData[updateId] || [])
  const [newComment, setNewComment] = useState("")
  const { user } = useAuth()
  const { addNotification } = useNotification()
  const commentInputRef = useRef(null)

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment = {
      id: Date.now(),
      user: {
        name: user?.user_metadata?.full_name || "You",
        avatar: user?.user_metadata?.avatar_url || "/placeholder.svg?key=you",
      },
      text: newComment.trim(),
      timestamp: "Just now",
    }

    setComments([comment, ...comments])
    setNewComment("")

    // Trigger notification for the new comment
    if (onNewComment) {
      onNewComment(updateId)
    }

    // Add to real-time notifications
    const update = [...userInvestmentUpdates, ...allCentaceProjects].find((u) => u.id === updateId)
    if (update) {
      addNotification({
        type: "comment",
        message: `You commented on the ${update.projectName} update`,
        relatedId: updateId,
      })
    }
  }

  return (
    <div className="mt-2 pt-2">
      <Separator className={`mb-3 ${themeStyles.borderSecondary}`} />

      {/* New comment input */}
      <div className="flex gap-2 mb-4">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={user?.user_metadata?.avatar_url || "/placeholder.svg?key=you"} alt="Your avatar" />
          <AvatarFallback>Y</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex gap-2">
          <Textarea
            ref={commentInputRef}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className={`${themeStyles.backgroundSecondary} ${themeStyles.border} flex-1 max-h-20 min-h-[40px] py-2 text-sm resize-none`}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleAddComment()
              }
            }}
          />
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 self-end"
            onClick={handleAddComment}
            aria-label="Post comment"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Existing comments */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
              <Avatar className="h-8 w-8 shrink-0 mt-1">
                <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{comment.user.name}</span>
                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                </div>
                <p className={`text-sm ${themeStyles.text}`}>{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  )
}

// Notification Badge Component
const NotificationBadge = ({ count }) => {
  if (count === 0) return null

  return (
    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
      {count > 9 ? "9+" : count}
    </span>
  )
}

// Notification Item Component
const NotificationItem = ({ notification, onMarkAsRead, onRemove, themeStyles, onViewRelated }) => {
  const getIcon = () => {
    switch (notification.type) {
      case "comment":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "update":
        return <Bell className="h-4 w-4 text-green-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div
      className={`p-3 border-b ${themeStyles.borderSecondary} ${
        notification.read ? "" : "bg-blue-50/10"
      } hover:bg-gray-100/10 cursor-pointer`}
      onClick={() => onViewRelated(notification.relatedId)}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1">
          <p className={`text-sm ${notification.read ? themeStyles.textSecondary : themeStyles.text}`}>
            {notification.message}
          </p>
          <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
        </div>
        <div className="flex items-center gap-1">
          {!notification.read && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                onMarkAsRead(notification.id)
              }}
            >
              <Check className="h-4 w-4" />
              <span className="sr-only">Mark as read</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 rounded-full text-gray-500 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation()
              onRemove(notification.id)
            }}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

// Main portfolio content component
function PortfolioContent() {
  const router = useRouter()
  const { user } = useAuth()
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme || "dark"
  const { addNotification } = useNotification()
  const [investments, setInvestments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("my-updates")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("newest")
  const [expandedComments, setExpandedComments] = useState({})
  const [likedUpdates, setLikedUpdates] = useState({})
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState(null)

  // Toggle comment section visibility
  const toggleComments = (updateId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [updateId]: !prev[updateId],
    }))
  }

  // Toggle like status
  const toggleLike = (updateId) => {
    const wasLiked = likedUpdates[updateId]
    setLikedUpdates((prev) => ({
      ...prev,
      [updateId]: !prev[updateId],
    }))

    // Add notification when user likes an update (only when liking, not unliking)
    if (!wasLiked) {
      const update = [...userInvestmentUpdates, ...allCentaceProjects].find((u) => u.id === updateId)
      if (update) {
        addNotification({
          type: "like",
          message: `You liked the ${update.projectName} update`,
          relatedId: updateId,
        })
      }
    }
  }

  // Handle new comment notification
  const handleNewComment = (updateId) => {
    // This is now handled in the CommentSection component
  }

  // View related content when clicking on a notification
  const viewRelatedContent = (relatedId) => {
    // Find the update
    const update = [...userInvestmentUpdates, ...allCentaceProjects].find((u) => u.id === relatedId)

    if (update) {
      // Set the appropriate tab
      if (userInvestmentUpdates.some((u) => u.id === relatedId)) {
        setActiveTab("my-updates")
      } else {
        setActiveTab("all-projects")
      }

      // Expand comments if it's a comment notification
      setExpandedComments((prev) => ({
        ...prev,
        [relatedId]: true,
      }))

      // Scroll to the update (in a real app, you'd want to implement this)
      // For now, we'll just focus on the update
      setTimeout(() => {
        const updateElement = document.getElementById(`update-${relatedId}`)
        if (updateElement) {
          updateElement.scrollIntoView({ behavior: "smooth", block: "center" })
          updateElement.classList.add("highlight-update")
          setTimeout(() => {
            updateElement.classList.remove("highlight-update")
          }, 2000)
        }
      }, 100)
    }
  }

  // Fetch user investments
  useEffect(() => {
    const fetchInvestments = async () => {
      if (!user) return

      setLoading(true)
      try {
        const data = await getUserInvestments(user.id)
        setInvestments(data)
      } catch (err) {
        console.error("Error fetching investments:", err)
        setError("Failed to load your investments")
      } finally {
        setLoading(false)
      }
    }

    fetchInvestments()
  }, [user])

  // Theme-based style variables
  const themeStyles = {
    background: theme === "dark" ? "bg-[#0a0a0f]" : "bg-[#f8fafc]",
    backgroundSecondary: theme === "dark" ? "bg-[#0d1117]" : "bg-white",
    backgroundCard: theme === "dark" ? "bg-[#1a1d24]" : "bg-white",
    backgroundCardAlt: theme === "dark" ? "bg-[#1e2128]" : "bg-gray-100",
    text: theme === "dark" ? "text-white" : "text-gray-900",
    textSecondary: theme === "dark" ? "text-gray-300" : "text-gray-600",
    textTertiary: theme === "dark" ? "text-gray-400" : "text-gray-500",
    border: theme === "dark" ? "border-gray-800" : "border-gray-200",
    borderSecondary: theme === "dark" ? "border-gray-700" : "border-gray-300",
    hover: theme === "dark" ? "hover:bg-[#21262d]" : "hover:bg-gray-50",
    activeTab: theme === "dark" ? "bg-blue-600" : "bg-blue-600",
    inactiveTab: theme === "dark" ? "bg-[#21262d]" : "bg-gray-200",
  }

  // Get the appropriate updates based on active tab
  const getActiveUpdates = () => {
    return activeTab === "my-updates" ? userInvestmentUpdates : allCentaceProjects
  }

  // Filter updates based on search query
  const filteredUpdates = getActiveUpdates().filter(
    (update) =>
      update.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort updates based on selected option
  const sortedUpdates = [...filteredUpdates].sort((a, b) => {
    if (sortOption === "newest") {
      // Simple sort by timestamp (assuming "X days ago" format)
      const aTime = Number.parseInt(a.timestamp.split(" ")[0])
      const bTime = Number.parseInt(b.timestamp.split(" ")[0])
      return aTime - bTime
    } else if (sortOption === "oldest") {
      const aTime = Number.parseInt(a.timestamp.split(" ")[0])
      const bTime = Number.parseInt(b.timestamp.split(" ")[0])
      return bTime - aTime
    } else if (sortOption === "popular") {
      // Sort by total engagement (views + comments)
      const aEngagement = a.stats.views + a.stats.comments
      const bEngagement = b.stats.views + b.stats.comments
      return bEngagement - aEngagement
    }
    return 0
  })

  if (loading) {
    return (
      <div className={`min-h-screen ${themeStyles.background} ${themeStyles.text} flex items-center justify-center`}>
        <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-t-blue-500 animate-spin"></div>
      </div>
    )
  }

  return (
    <main className={`p-6 ${themeStyles.background} overflow-auto min-h-screen`}>
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Portfolio Tracking</h1>
            <p className={`mt-1 ${themeStyles.textTertiary}`}>Follow the progress of your investments</p>
          </div>

          {/* Notifications */}
          <NotificationDropdown onViewRelated={viewRelatedContent} />
        </div>

        {/* Investment Updates Feed */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex space-x-2">
              <Button
                variant={activeTab === "my-updates" ? "default" : "outline"}
                className={activeTab === "my-updates" ? "bg-blue-600 hover:bg-blue-700" : ""}
                onClick={() => setActiveTab("my-updates")}
              >
                My Investment Updates
              </Button>
              <Button
                variant={activeTab === "all-projects" ? "default" : "outline"}
                className={activeTab === "all-projects" ? "bg-blue-600 hover:bg-blue-700" : ""}
                onClick={() => setActiveTab("all-projects")}
              >
                All Centace Projects
              </Button>
            </div>
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search updates..."
                  className={`pl-9 w-full md:w-[240px] ${themeStyles.backgroundSecondary} ${themeStyles.border}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className={`w-[120px] ${themeStyles.backgroundSecondary} ${themeStyles.border}`}>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error ? (
            <Card className={`${themeStyles.backgroundCard} ${themeStyles.border} p-6 text-center`}>
              <p className="text-red-500">{error}</p>
            </Card>
          ) : sortedUpdates.length === 0 ? (
            <Card className={`${themeStyles.backgroundCard} ${themeStyles.border} p-8 text-center`}>
              <p className={themeStyles.textSecondary}>
                {searchQuery
                  ? "No updates match your search criteria."
                  : activeTab === "my-updates"
                    ? "No investment updates available for your projects yet."
                    : "No Centace project updates available yet."}
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedUpdates.map((update) => (
                <Card
                  key={update.id}
                  id={`update-${update.id}`}
                  className={`overflow-hidden ${themeStyles.backgroundCardAlt} border-0 transition-all duration-300`}
                >
                  {/* Media Section */}
                  <div
                    className="relative h-48 bg-gray-500 cursor-pointer"
                    onClick={() => {
                      setSelectedMedia({
                        type: update.mediaType,
                        url: update.mediaUrl,
                        title: update.projectName,
                        content: update.content,
                      })
                      setIsMediaModalOpen(true)
                    }}
                  >
                    <img
                      src={update.mediaUrl || "/placeholder.svg"}
                      alt={update.projectName}
                      className="w-full h-full object-cover"
                    />
                    <Badge
                      className={`absolute top-3 right-3 ${
                        update.mediaType === "video" ? "bg-blue-500" : "bg-green-500"
                      }`}
                    >
                      {update.mediaType === "video" ? (
                        <div className="flex items-center space-x-1">
                          <Play className="h-3 w-3" />
                          <span>Video</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <ImageIcon className="h-3 w-3" />
                          <span>Image</span>
                        </div>
                      )}
                    </Badge>
                    {update.mediaType === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    )}
                    <Badge className="absolute bottom-3 left-3 bg-black bg-opacity-70">{update.projectName}</Badge>
                  </div>

                  {/* Content Section */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <p className={`${themeStyles.text}`}>{update.content}</p>
                    </div>
                    <div className="text-sm text-gray-500 mb-3">{update.timestamp}</div>

                    {/* User and Stats */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={update.user.avatar || "/placeholder.svg"} alt={update.user.name} />
                          <AvatarFallback>{update.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-500">{update.user.name}</span>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Eye className="h-4 w-4" />
                          <span>{update.stats.views}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`text-gray-500 flex items-center space-x-1 p-0 h-auto ${expandedComments[update.id] ? "text-blue-500" : ""}`}
                          onClick={() => toggleComments(update.id)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{update.stats.comments}</span>
                          {expandedComments[update.id] ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`text-gray-500 p-1 h-auto ${likedUpdates[update.id] ? "text-red-500" : ""}`}
                          onClick={() => toggleLike(update.id)}
                        >
                          {likedUpdates[update.id] ? (
                            <Heart className="h-4 w-4 fill-current" />
                          ) : (
                            <Heart className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 p-1 h-auto"
                          onClick={() => {
                            // Share functionality
                            if (navigator.share) {
                              navigator
                                .share({
                                  title: update.projectName,
                                  text: update.content,
                                  url: window.location.href,
                                })
                                .catch(console.error)
                            } else {
                              // Fallback - copy to clipboard
                              navigator.clipboard.writeText(
                                `${update.projectName}: ${update.content} - Check it out at ${window.location.href}`,
                              )
                              toast({
                                title: "Link copied to clipboard",
                                description: "You can now share it with others",
                                duration: 3000,
                              })
                            }

                            // Add notification for sharing
                            addNotification({
                              type: "update",
                              message: `You shared the ${update.projectName} update`,
                              relatedId: update.id,
                            })
                          }}
                        >
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Expandable Comment Section */}
                    {expandedComments[update.id] && (
                      <CommentSection updateId={update.id} themeStyles={themeStyles} onNewComment={handleNewComment} />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Media Modal for Images and Videos */}
          <Dialog open={isMediaModalOpen} onOpenChange={setIsMediaModalOpen}>
            <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden bg-black">
              <DialogHeader className="absolute top-0 right-0 z-10">
                <DialogClose className="rounded-full p-1 bg-black bg-opacity-50 text-white hover:bg-opacity-70">
                  <X className="h-5 w-5" />
                </DialogClose>
              </DialogHeader>

              <div className="relative w-full h-[80vh] flex items-center justify-center">
                {selectedMedia?.type === "video" ? (
                  <div className="w-full h-full">
                    <video
                      src={
                        selectedMedia.url === "/agricultural-investment.png"
                          ? "/sample-video.mp4"
                          : "/sample-video2.mp4"
                      }
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <img
                    src={selectedMedia?.url || "/placeholder.svg"}
                    alt={selectedMedia?.title}
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>

              <div className="p-4 bg-black text-white">
                <h3 className="text-xl font-bold">{selectedMedia?.title}</h3>
                <p className="text-gray-300 mt-1">{selectedMedia?.content}</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <style jsx global>{`
        .highlight-update {
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.8);
          }
        }
      `}</style>
    </main>
  )
}

// Wrap the portfolio page with the NotificationProvider
export default function PortfolioPage() {
  return (
    <NotificationProvider>
      <PortfolioContent />
    </NotificationProvider>
  )
}
