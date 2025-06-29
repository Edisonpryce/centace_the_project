"use client"

import { useState, useEffect } from "react"
import { getAllBookings, updateBookingStatus, type Booking } from "@/lib/services/booking-service"
import { format, isPast } from "date-fns"
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  CarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  SearchIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

export default function AdminBookingsPage() {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme || "dark"
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("upcoming")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true)
      try {
        const bookingsData = await getAllBookings()
        setBookings(bookingsData)
      } catch (error) {
        console.error("Error fetching bookings:", error)
        toast({
          title: "Error",
          description: "Failed to load bookings. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    try {
      const success = await updateBookingStatus(bookingId, status)

      if (success) {
        // Update the booking status locally
        setBookings(bookings.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking)))

        toast({
          title: "Status Updated",
          description: `Booking status has been updated to ${status}.`,
        })
      } else {
        throw new Error("Failed to update booking status")
      }
    } catch (error) {
      console.error("Error updating booking status:", error)
      toast({
        title: "Error",
        description: "Failed to update booking status. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Filter bookings based on search query and filters
  const filteredBookings = bookings.filter((booking) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      booking.project_name.toLowerCase().includes(searchLower) ||
      booking.location.toLowerCase().includes(searchLower) ||
      booking.booking_reference.toLowerCase().includes(searchLower)

    // Status filter
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    // Date filter
    let matchesDate = true
    const today = new Date()
    const visitDate = new Date(booking.visit_date)

    if (dateFilter === "today") {
      const todayStr = today.toISOString().split("T")[0]
      matchesDate = booking.visit_date === todayStr
    } else if (dateFilter === "thisWeek") {
      const weekStart = new Date(today)
      weekStart.setDate(today.getDate() - today.getDay())
      const weekEnd = new Date(today)
      weekEnd.setDate(weekStart.getDate() + 6)
      matchesDate = visitDate >= weekStart && visitDate <= weekEnd
    } else if (dateFilter === "thisMonth") {
      matchesDate = visitDate.getMonth() === today.getMonth() && visitDate.getFullYear() === today.getFullYear()
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  // Split bookings into upcoming and past
  const upcomingBookings = filteredBookings.filter(
    (booking) => !isPast(new Date(booking.visit_date)) || booking.status === "confirmed",
  )

  const pastBookings = filteredBookings.filter(
    (booking) => isPast(new Date(booking.visit_date)) && booking.status !== "confirmed",
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>
      case "no-show":
        return <Badge className="bg-yellow-500">No Show</Badge>
      default:
        return <Badge className="bg-gray-500">{status}</Badge>
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Manage Bookings</h1>
        <p className="text-muted-foreground mt-2">View and manage all site visit bookings</p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="no-show">No Show</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">
            Upcoming Bookings {upcomingBookings.length > 0 && `(${upcomingBookings.length})`}
          </TabsTrigger>
          <TabsTrigger value="past">
            Past & Cancelled Bookings {pastBookings.length > 0 && `(${pastBookings.length})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="h-24 bg-gray-200 dark:bg-gray-800"></CardHeader>
                  <CardContent className="py-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-3 w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                  </CardContent>
                  <CardFooter className="h-12 bg-gray-100 dark:bg-gray-900"></CardFooter>
                </Card>
              ))}
            </div>
          ) : upcomingBookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{booking.project_name}</CardTitle>
                      {getStatusBadge(booking.status)}
                    </div>
                    <CardDescription className="flex items-center mt-1">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {booking.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          {format(new Date(booking.visit_date), "EEEE, MMMM d, yyyy")} at {booking.visit_time}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <UsersIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          {booking.visitors} {booking.visitors === 1 ? "Person" : "People"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <CarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          {booking.transportation === "own" ? "Own Transportation" : "Arranged Transportation"}
                        </span>
                      </div>
                      {booking.special_requests && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                          <p className="text-sm font-medium mb-1">Special Requests:</p>
                          <p className="text-sm text-muted-foreground">{booking.special_requests}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="text-sm text-muted-foreground">ID: {booking.booking_reference}</div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Update Status
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleUpdateStatus(booking.id, "confirmed")}>
                          <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500" />
                          Confirm
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(booking.id, "cancelled")}>
                          <XCircleIcon className="h-4 w-4 mr-2 text-red-500" />
                          Cancel
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(booking.id, "completed")}>
                          <CheckCircleIcon className="h-4 w-4 mr-2 text-blue-500" />
                          Mark as Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(booking.id, "no-show")}>
                          <XCircleIcon className="h-4 w-4 mr-2 text-yellow-500" />
                          Mark as No-Show
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <CalendarIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Upcoming Bookings</h3>
              <p className="text-muted-foreground mb-6">There are no upcoming site visits scheduled.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="h-24 bg-gray-200 dark:bg-gray-800"></CardHeader>
                  <CardContent className="py-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-3 w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                  </CardContent>
                  <CardFooter className="h-12 bg-gray-100 dark:bg-gray-900"></CardFooter>
                </Card>
              ))}
            </div>
          ) : pastBookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastBookings.map((booking) => (
                <Card
                  key={booking.id}
                  className={`overflow-hidden ${booking.status === "cancelled" ? "opacity-75" : ""}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{booking.project_name}</CardTitle>
                      {getStatusBadge(booking.status)}
                    </div>
                    <CardDescription className="flex items-center mt-1">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {booking.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          {format(new Date(booking.visit_date), "EEEE, MMMM d, yyyy")} at {booking.visit_time}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <UsersIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          {booking.visitors} {booking.visitors === 1 ? "Person" : "People"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <CarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          {booking.transportation === "own" ? "Own Transportation" : "Arranged Transportation"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="text-sm text-muted-foreground">ID: {booking.booking_reference}</div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <ClockIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Past Bookings</h3>
              <p className="text-muted-foreground mb-6">There are no past or cancelled site visits.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
