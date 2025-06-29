"use client"

import { useNotifications } from "@/lib/context/notifications-context"
import { cn } from "@/lib/utils"

interface NotificationBadgeProps {
  className?: string
}

export function NotificationBadge({ className }: NotificationBadgeProps) {
  const { unreadCount } = useNotifications()

  if (unreadCount === 0) return null

  return (
    <span
      className={cn(
        "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white",
        className,
      )}
    >
      {unreadCount > 9 ? "9+" : unreadCount}
    </span>
  )
}
