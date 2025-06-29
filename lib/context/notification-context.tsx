"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "@/components/ui/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useAuth } from "./auth-context"

// Define notification types
export type NotificationType = "comment" | "like" | "update" | "investment" | "return"

export interface Notification {
  id: string | number
  type: NotificationType
  message: string
  timestamp: string
  read: boolean
  relatedId: string | number
  userId?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  connectionStatus: "connected" | "connecting" | "disconnected"
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read" | "userId">) => void
  markNotificationAsRead: (id: string | number) => void
  markAllAsRead: () => void
  removeNotification: (id: string | number) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "disconnected">("connecting")
  const { user } = useAuth()
  const supabase = createClientComponentClient()

  // Calculate unread count
  const unreadCount = notifications.filter((n) => !n.read).length

  // Initialize notifications and set up real-time subscription
  useEffect(() => {
    if (!user) return

    // Set connection status to connecting
    setConnectionStatus("connecting")

    // Fetch initial notifications
    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Error fetching notifications:", error)
          return
        }

        if (data) {
          setNotifications(
            data.map((n) => ({
              id: n.id,
              type: n.type as NotificationType,
              message: n.message,
              timestamp: formatTimestamp(n.created_at),
              read: n.read,
              relatedId: n.related_id,
              userId: n.user_id,
            })),
          )
        }
      } catch (error) {
        console.error("Error in fetchNotifications:", error)
      }
    }

    fetchNotifications()

    // Set up real-time subscription
    const channel = supabase
      .channel("notifications-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const newNotification = payload.new as any

          // Add the new notification to state
          setNotifications((prev) => [
            {
              id: newNotification.id,
              type: newNotification.type as NotificationType,
              message: newNotification.message,
              timestamp: formatTimestamp(newNotification.created_at),
              read: newNotification.read,
              relatedId: newNotification.related_id,
              userId: newNotification.user_id,
            },
            ...prev,
          ])

          // Show toast for the new notification
          toast({
            title: "New Notification",
            description: newNotification.message,
            duration: 5000,
          })
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const updatedNotification = payload.new as any

          // Update the notification in state
          setNotifications((prev) =>
            prev.map((n) =>
              n.id === updatedNotification.id
                ? {
                    ...n,
                    read: updatedNotification.read,
                    message: updatedNotification.message,
                    timestamp: formatTimestamp(updatedNotification.updated_at || updatedNotification.created_at),
                  }
                : n,
            ),
          )
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const deletedNotification = payload.old as any

          // Remove the notification from state
          setNotifications((prev) => prev.filter((n) => n.id !== deletedNotification.id))
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setConnectionStatus("connected")
        } else {
          setConnectionStatus("connecting")
        }
      })

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, supabase])

  // Format timestamp to relative time
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    if (diffSec < 60) return "Just now"
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`
    if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`

    return date.toLocaleDateString()
  }

  // Add a new notification
  const addNotification = async (notification: Omit<Notification, "id" | "timestamp" | "read" | "userId">) => {
    if (!user) return

    try {
      // Add to database
      const { data, error } = await supabase
        .from("notifications")
        .insert({
          type: notification.type,
          message: notification.message,
          related_id: notification.relatedId,
          user_id: user.id,
          read: false,
          created_at: new Date().toISOString(),
        })
        .select()

      if (error) {
        console.error("Error adding notification:", error)
        return
      }

      // The real-time subscription will handle adding this to state
      // But we can also add it directly for immediate feedback
      if (data && data[0]) {
        const newNotification = {
          id: data[0].id,
          type: notification.type,
          message: notification.message,
          timestamp: "Just now",
          read: false,
          relatedId: notification.relatedId,
          userId: user.id,
        }

        setNotifications((prev) => [newNotification, ...prev])
      }
    } catch (error) {
      console.error("Error in addNotification:", error)
    }
  }

  // Mark a notification as read
  const markNotificationAsRead = async (id: string | number) => {
    if (!user) return

    try {
      // Update in database
      const { error } = await supabase
        .from("notifications")
        .update({ read: true, updated_at: new Date().toISOString() })
        .eq("id", id)
        .eq("user_id", user.id)

      if (error) {
        console.error("Error marking notification as read:", error)
        return
      }

      // Update in state
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    } catch (error) {
      console.error("Error in markNotificationAsRead:", error)
    }
  }

  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (!user) return

    try {
      // Update in database
      const { error } = await supabase
        .from("notifications")
        .update({ read: true, updated_at: new Date().toISOString() })
        .eq("user_id", user.id)
        .eq("read", false)

      if (error) {
        console.error("Error marking all notifications as read:", error)
        return
      }

      // Update in state
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    } catch (error) {
      console.error("Error in markAllAsRead:", error)
    }
  }

  // Remove a notification
  const removeNotification = async (id: string | number) => {
    if (!user) return

    try {
      // Delete from database
      const { error } = await supabase.from("notifications").delete().eq("id", id).eq("user_id", user.id)

      if (error) {
        console.error("Error removing notification:", error)
        return
      }

      // Remove from state
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    } catch (error) {
      console.error("Error in removeNotification:", error)
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        connectionStatus,
        addNotification,
        markNotificationAsRead,
        markAllAsRead,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
