"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase/client"
import {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "@/lib/services/notification-service"
import type { Notification } from "@/lib/types/database"
import { useAuth } from "@/lib/context/auth-context"
import { Bell } from "lucide-react"

type NotificationsContextType = {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  deleteOne: (id: string) => Promise<void>
  refreshNotifications: () => Promise<void>
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // Fetch notifications on mount and when user changes
  useEffect(() => {
    if (user) {
      fetchNotifications()
    } else {
      setNotifications([])
      setUnreadCount(0)
      setLoading(false)
    }
  }, [user])

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return

    // Subscribe to changes on the notifications table
    const subscription = supabase
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
          const newNotification = payload.new as Notification
          // Add the notification to the state
          setNotifications((prev) => [newNotification, ...prev])
          setUnreadCount((prev) => prev + 1)

          // Show a toast for the new notification
          toast({
            title: newNotification.title,
            description: newNotification.message,
            icon: <Bell className="h-4 w-4" />,
          })
        },
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  const fetchNotifications = async () => {
    if (!user) return

    setLoading(true)
    try {
      const data = await getUserNotifications(user.id)
      setNotifications(data)
      setUnreadCount(data.filter((n) => !n.is_read).length)
    } catch (error) {
      console.error("Error fetching notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    const success = await markNotificationAsRead(id)
    if (success) {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)))
      setUnreadCount((prev) => prev - 1)
    }
  }

  const markAllAsRead = async () => {
    if (!user) return

    const success = await markAllNotificationsAsRead(user.id)
    if (success) {
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
      setUnreadCount(0)
    }
  }

  const deleteOne = async (id: string) => {
    const success = await deleteNotification(id)
    if (success) {
      const deleted = notifications.find((n) => n.id === id)
      setNotifications((prev) => prev.filter((n) => n.id !== id))
      if (deleted && !deleted.is_read) {
        setUnreadCount((prev) => prev - 1)
      }
    }
  }

  const refreshNotifications = async () => {
    return fetchNotifications()
  }

  const value = {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteOne,
    refreshNotifications,
  }

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}
