"use client"

import { useState } from "react"
import { useNotifications } from "@/lib/context/notifications-context"
import { formatDistanceToNow } from "date-fns"
import { Check, Trash2, Bell, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteOne } = useNotifications()
  const [filter, setFilter] = useState<string | null>(null)

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

  const getNotificationTypeLabel = (type: string) => {
    switch (type) {
      case "investment":
        return "Investment"
      case "update":
        return "Update"
      case "return":
        return "Return"
      case "welcome":
        return "Welcome"
      case "new":
        return "New"
      default:
        return "Notification"
    }
  }

  const filteredNotifications = filter ? notifications.filter((n) => n.type === filter) : notifications

  const unreadNotifications = notifications.filter((n) => !n.is_read)
  const readNotifications = notifications.filter((n) => n.is_read)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {filter ? getNotificationTypeLabel(filter) : "All Types"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter(null)}>All Types</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("investment")}>Investment</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("update")}>Update</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("return")}>Return</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("welcome")}>Welcome</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("new")}>New</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={() => markAllAsRead()}>
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="read">Read ({readNotifications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                <p className="text-muted-foreground mt-1">
                  {filter
                    ? `You don't have any ${getNotificationTypeLabel(filter).toLowerCase()} notifications`
                    : "You don't have any notifications yet"}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${!notification.is_read ? "bg-blue-50/50 dark:bg-blue-900/20" : "bg-card"}`}
                >
                  <div className="flex items-start">
                    <div
                      className={`w-3 h-3 mt-1.5 rounded-full ${getNotificationTypeColor(notification.type)} mr-3 flex-shrink-0`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{notification.title}</h3>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="mt-1">{notification.message}</p>
                      <div className="flex justify-end mt-2 gap-2">
                        {!notification.is_read && (
                          <Button variant="ghost" size="sm" className="h-8" onClick={() => markAsRead(notification.id)}>
                            <Check className="h-4 w-4 mr-2" />
                            Mark as read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-destructive hover:text-destructive"
                          onClick={() => deleteOne(notification.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="unread">
          <div className="space-y-4">
            {unreadNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                <h3 className="mt-4 text-lg font-medium">No unread notifications</h3>
                <p className="text-muted-foreground mt-1">You've read all your notifications</p>
              </div>
            ) : (
              unreadNotifications
                .filter((n) => (filter ? n.type === filter : true))
                .map((notification) => (
                  <div key={notification.id} className="p-4 rounded-lg border bg-blue-50/50 dark:bg-blue-900/20">
                    <div className="flex items-start">
                      <div
                        className={`w-3 h-3 mt-1.5 rounded-full ${getNotificationTypeColor(notification.type)} mr-3 flex-shrink-0`}
                      ></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="mt-1">{notification.message}</p>
                        <div className="flex justify-end mt-2 gap-2">
                          <Button variant="ghost" size="sm" className="h-8" onClick={() => markAsRead(notification.id)}>
                            <Check className="h-4 w-4 mr-2" />
                            Mark as read
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-destructive hover:text-destructive"
                            onClick={() => deleteOne(notification.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="read">
          <div className="space-y-4">
            {readNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                <h3 className="mt-4 text-lg font-medium">No read notifications</h3>
                <p className="text-muted-foreground mt-1">You haven't read any notifications yet</p>
              </div>
            ) : (
              readNotifications
                .filter((n) => (filter ? n.type === filter : true))
                .map((notification) => (
                  <div key={notification.id} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-start">
                      <div
                        className={`w-3 h-3 mt-1.5 rounded-full ${getNotificationTypeColor(notification.type)} mr-3 flex-shrink-0`}
                      ></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="mt-1">{notification.message}</p>
                        <div className="flex justify-end mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-destructive hover:text-destructive"
                            onClick={() => deleteOne(notification.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
