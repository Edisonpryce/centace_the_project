"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bell, Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNotifications } from "@/lib/context/notifications-context"
import { formatDistanceToNow } from "date-fns"
import { NotificationBadge } from "@/components/notification-badge"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

export function NotificationsDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteOne } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Subscribe to real-time notifications
  useEffect(() => {
    // Initialize Supabase real-time subscription for notifications
    const setupRealTimeNotifications = async () => {
      try {
        // This would connect to the Supabase channel for real-time updates
        console.log("Setting up real-time notification listener")

        // When a new notification arrives, show a toast
        const handleNewNotification = (notification) => {
          toast({
            title: notification.title || "New Notification",
            description: notification.message,
            duration: 5000,
          })
        }

        // Mock receiving a new notification after 5 seconds (for testing)
        if (process.env.NODE_ENV === "development") {
          const testTimer = setTimeout(() => {
            handleNewNotification({
              title: "Investment Update",
              message: "Your Agriculture Project has a new update",
            })
          }, 5000)

          return () => clearTimeout(testTimer)
        }
      } catch (error) {
        console.error("Error setting up real-time notifications:", error)
      }
    }

    setupRealTimeNotifications()

    // Cleanup function
    return () => {
      console.log("Cleaning up real-time notification listener")
    }
  }, [])

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case "investment":
        return "bg-green-500"
      case "update":
        return "bg-blue-500"
      case "return":
        return "bg-purple-500"
      case "welcome":
        return "bg-yellow-500"
      case "new":
        return "bg-indigo-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    await markAsRead(id)
  }

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    await deleteOne(id)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full transition-colors duration-200 relative hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => {
          setIsOpen(!isOpen)
          // Mark notifications as seen when opening dropdown
          if (!isOpen && unreadCount > 0) {
            // This doesn't mark them as read yet, just acknowledges them
            console.log("Opened notifications dropdown")
          }
        }}
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
      >
        <Bell className="h-5 w-5" />
        <NotificationBadge />
        {/* Add a subtle animation for new notifications */}
        {unreadCount > 0 && (
          <span className="absolute inset-0 rounded-full animate-ping-slow bg-blue-500 opacity-30"></span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white dark:bg-[#161b22] shadow-lg border z-50 border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllAsRead()}
                  className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          <div className="max-h-[350px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "px-4 py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-accent/50 cursor-pointer group",
                    !notification.is_read && "bg-blue-50/50 dark:bg-blue-900/20",
                  )}
                  onClick={() => {
                    // Navigate to related content if available
                    if (notification.related_id) {
                      // For investment updates, navigate to the portfolio page
                      if (notification.type === "investment" || notification.type === "update") {
                        // router.push(`/dashboard/portfolio?highlight=${notification.related_id}`)
                        console.log(`Navigate to: /dashboard/portfolio?highlight=${notification.related_id}`)
                      }
                      // For returns, navigate to the account page
                      else if (notification.type === "return") {
                        // router.push(`/dashboard/account?highlight=${notification.related_id}`)
                        console.log(`Navigate to: /dashboard/account?highlight=${notification.related_id}`)
                      }
                    }
                    handleMarkAsRead(notification.id, new Event("click") as React.MouseEvent<HTMLButtonElement>)
                  }}
                >
                  <div className="flex items-start">
                    <div
                      className={`w-2 h-2 mt-1.5 rounded-full ${getNotificationTypeColor(notification.type)} mr-2 flex-shrink-0`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        <span className="font-medium">{notification.title}:</span> {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground text-gray-600 dark:text-gray-400 mt-1">
                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                      </p>
                    </div>
                    <div className="flex space-x-1 ml-2">
                      {!notification.is_read && (
                        <button
                          onClick={(e) => handleMarkAsRead(notification.id, e)}
                          className="p-1 rounded-full hover:bg-accent"
                          title="Mark as read"
                        >
                          <Check className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      )}
                      <button
                        onClick={(e) => handleDelete(notification.id, e)}
                        className="p-1 rounded-full hover:bg-accent"
                        title="Delete notification"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t py-2 px-4 text-center border-gray-200 dark:border-gray-700">
            <button
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Add this to your global CSS or as a style tag
// <style jsx global>{`
//   @keyframes ping-slow {
//     0% {
//       transform: scale(1);
//       opacity: 0.3;
//     }
//     50% {
//       transform: scale(1.2);
//       opacity: 0.2;
//     }
//     100% {
//       transform: scale(1);
//       opacity: 0.3;
//     }
//   }
//   .animate-ping-slow {
//     animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
//   }
// `}</style>
