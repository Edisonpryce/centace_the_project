"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { useAuth } from "@/lib/context/auth-context"
import { toast } from "@/hooks/use-toast"
import { Bell } from "lucide-react"

export type Notification = {
  id: number | string
  type: "comment" | "like" | "update" | "investment" | "return" | string
  message: string
  timestamp: string
  read: boolean
  relatedId: number | string
  user_id?: string
}

export function useRealTimeNotifications(initialNotifications: Notification[] = []) {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "connecting">("disconnected")
  const [error, setError] = useState<string | null>(null)

  // Get unread notifications count
  const unreadCount = notifications.filter((n) => !n.read).length

  // Add a new notification
  const addNotification = (notification: Partial<Notification>) => {
    const newNotification = {
      id: Date.now(),
      type: "update",
      timestamp: "Just now",
      read: false,
      relatedId: 0,
      ...notification,
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Show toast for new notification
    toast({
      title: "New Notification",
      description: notification.message,
      icon: <Bell className="h-4 w-4" />,
      duration: 3000,
    })
  }

  // Mark notification as read
  const markNotificationAsRead = (id: number | string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )

    // If connected to Supabase, update the database
    if (connectionStatus === "connected" && user) {
      supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", id)
        .then(({ error }) => {
          if (error) {
            console.error("Error marking notification as read:", error)
          }
        })
    }
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))

    // If connected to Supabase, update the database
    if (connectionStatus === "connected" && user) {
      supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", user.id)
        .eq("is_read", false)
        .then(({ error }) => {
          if (error) {
            console.error("Error marking all notifications as read:", error)
          }
        })
    }
  }

  // Remove notification
  const removeNotification = (id: number | string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))

    // If connected to Supabase, update the database
    if (connectionStatus === "connected" && user) {
      supabase
        .from("notifications")
        .delete()
        .eq("id", id)
        .then(({ error }) => {
          if (error) {
            console.error("Error removing notification:", error)
          }
        })
    }
  }

  // Fetch notifications from the database
  const fetchNotifications = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      if (data) {
        // Transform the data to match our Notification type
        const transformedData = data.map((item) => ({
          id: item.id,
          type: item.type,
          message: item.message || item.title,
          timestamp: new Date(item.created_at).toLocaleString(),
          read: item.is_read,
          relatedId: item.related_id || 0,
          user_id: item.user_id,
        }))

        setNotifications(transformedData)
      }
    } catch (err) {
      console.error("Error fetching notifications:", err)
      setError("Failed to load notifications")
    }
  }

  // Set up real-time subscription
  useEffect(() => {
    if (!user) {
      setConnectionStatus("disconnected")
      return
    }

    setConnectionStatus("connecting")

    // Fetch initial notifications
    fetchNotifications()

    // Subscribe to changes on the notifications table
    const subscription = supabase
      .channel("notifications-changes")
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

          // Transform to our notification format
          const notification: Notification = {
            id: newNotification.id,
            type: newNotification.type,
            message: newNotification.message || newNotification.title,
            timestamp: new Date(newNotification.created_at).toLocaleString(),
            read: newNotification.is_read,
            relatedId: newNotification.related_id || 0,
            user_id: newNotification.user_id,
          }

          // Add the notification to the state
          setNotifications((prev) => [notification, ...prev])

          // Show a toast for the new notification
          toast({
            title: "New Notification",
            description: notification.message,
            icon: <Bell className="h-4 w-4" />,
            duration: 3000,
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
            prev.map((notification) =>
              notification.id === updatedNotification.id
                ? {
                    ...notification,
                    read: updatedNotification.is_read,
                    message: updatedNotification.message || updatedNotification.title,
                  }
                : notification,
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
          setNotifications((prev) => prev.filter((notification) => notification.id !== deletedNotification.id))
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setConnectionStatus("connected")
          console.log("Connected to real-time notifications")
        } else {
          setConnectionStatus("connecting")
        }
      })

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  return {
    notifications,
    unreadCount,
    connectionStatus,
    error,
    addNotification,
    markNotificationAsRead,
    markAllAsRead,
    removeNotification,
    fetchNotifications,
  }
}
