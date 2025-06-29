"use client"

import { useState } from "react"
import { Bell, Check, MessageSquare, Heart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useNotification } from "@/lib/context/notification-context"
import { useTheme } from "@/components/theme-provider"

// Notification Badge Component
const NotificationBadge = ({ count }: { count: number }) => {
  if (count === 0) return null

  return (
    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
      {count > 9 ? "9+" : count}
    </span>
  )
}

// Notification Item Component
const NotificationItem = ({
  notification,
  onMarkAsRead,
  onRemove,
  themeStyles,
  onViewRelated,
}: {
  notification: any
  onMarkAsRead: (id: number | string) => void
  onRemove: (id: number | string) => void
  themeStyles: any
  onViewRelated: (id: number | string) => void
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case "comment":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "update":
        return <Bell className="h-4 w-4 text-green-500" />
      case "investment":
        return <Bell className="h-4 w-4 text-purple-500" />
      case "return":
        return <Bell className="h-4 w-4 text-yellow-500" />
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

// Connection status indicator
const ConnectionStatus = ({ status }: { status: string }) => {
  if (status === "connected") {
    return <span className="h-2 w-2 rounded-full bg-green-500 absolute bottom-0 right-0 border border-white"></span>
  }
  if (status === "connecting") {
    return (
      <span className="h-2 w-2 rounded-full bg-yellow-500 absolute bottom-0 right-0 border border-white animate-pulse"></span>
    )
  }
  return <span className="h-2 w-2 rounded-full bg-red-500 absolute bottom-0 right-0 border border-white"></span>
}

export function NotificationDropdown({ onViewRelated }: { onViewRelated: (id: number | string) => void }) {
  const { notifications, unreadCount, connectionStatus, markNotificationAsRead, markAllAsRead, removeNotification } =
    useNotification()
  const [isOpen, setIsOpen] = useState(false)
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme || "dark"

  // Theme-based style variables
  const themeStyles = {
    backgroundSecondary: theme === "dark" ? "bg-[#0d1117]" : "bg-white",
    text: theme === "dark" ? "text-white" : "text-gray-900",
    textSecondary: theme === "dark" ? "text-gray-300" : "text-gray-600",
    borderSecondary: theme === "dark" ? "border-gray-700" : "border-gray-300",
  }

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <NotificationBadge count={unreadCount} />
            <ConnectionStatus status={connectionStatus} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={`w-80 p-0 ${themeStyles.backgroundSecondary} border-gray-700`} align="end">
          <div className="flex items-center justify-between p-3 border-b border-gray-700">
            <h3 className="font-medium">Notifications</h3>
            <div className="flex items-center gap-2">
              {connectionStatus === "connected" && (
                <span className="text-xs text-green-500 flex items-center">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                  Live
                </span>
              )}
              {connectionStatus === "connecting" && (
                <span className="text-xs text-yellow-500 flex items-center">
                  <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1 animate-pulse"></span>
                  Connecting...
                </span>
              )}
              {connectionStatus === "disconnected" && (
                <span className="text-xs text-red-500 flex items-center">
                  <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                  Offline
                </span>
              )}
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </div>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center">
                <p className={`text-sm ${themeStyles.textSecondary}`}>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markNotificationAsRead}
                  onRemove={removeNotification}
                  onViewRelated={onViewRelated}
                  themeStyles={themeStyles}
                />
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
