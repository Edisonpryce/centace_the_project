"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context/auth-context"
import { getUserBookings, cancelBooking, type Booking } from "@/lib/services/booking-service"
import { format, isPast } from "date-fns"
import { CalendarIcon, MapPinIcon, UsersIcon, CarIcon, ClockIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function MyBookingsPage() {
  const { user } = useAuth()
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme || "dark"
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("upcoming")
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return

      setIsLoading(true)
      try {
        const bookingsData = await getUserBookings(user.id)
        setBookings(bookingsData)
      } catch (error) {
        console.error("Error fetching bookings:", error)
        toast({
          title: "Error",
          description: "Failed to load your bookings. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [user])

  const handleCancelBooking = async (bookingId: string) => {
    if (!user) return

    setIsCancelling(true)
    try {
      const success = await cancelBooking(bookingId, user.id)

      if (success) {
        // Update the booking status locally
        setBookings(
          bookings.map((booking) => (booking.id === bookingId ? { ...booking, status: "cancelled" } : booking)),
        )

        toast({
          title: "Booking Cancelled",
          description: "Your booking has been successfully cancelled.",
        })
      } else {
        throw new Error("Failed to cancel booking")
      }
    } catch (error) {
      console.error("Error cancelling booking:", error)
      toast({
        title: "Error",
        description: "Failed to cancel your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCancelling(false)
      setCancellingId(null)
    }
  }

  const upcomingBookings = bookings.filter(
    (booking) => !isPast(new Date(booking.visit_date)) && booking.status === "confirmed",
  )

  const pastBookings = bookings.filter(
    (booking) => isPast(new Date(booking.visit_date)) || booking.status === "cancelled",
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>
      default:
        return <Badge className="bg-gray-500">{status}</Badge>
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground mt-2">View and manage your site visit bookings</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <div className="text-sm text-muted-foreground">Booking ID: {booking.booking_reference}</div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          Cancel Booking
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Cancel Booking</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to cancel your visit to {booking.project_name} on{" "}
                            {format(new Date(booking.visit_date), "MMMM d, yyyy")} at {booking.visit_time}?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setCancellingId(null)}
                            disabled={isCancelling && cancellingId === booking.id}
                          >
                            Keep Booking
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleCancelBooking(booking.id)}
                            disabled={isCancelling && cancellingId === booking.id}
                          >
                            {isCancelling && cancellingId === booking.id ? "Cancelling..." : "Yes, Cancel Booking"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
              <p className="text-muted-foreground mb-6">You don't have any upcoming site visits scheduled.</p>
              <Button asChild>
                <Link href="/dashboard/visit">Book a Site Visit</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      {booking.special_requests && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                          <p className="text-sm font-medium mb-1">Special Requests:</p>
                          <p className="text-sm text-muted-foreground">{booking.special_requests}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="text-sm text-muted-foreground">Booking ID: {booking.booking_reference}</div>
                    {isPast(new Date(booking.visit_date)) && booking.status === "confirmed" && (
                      <Badge className="bg-blue-500">Completed</Badge>
                    )}
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
              <p className="text-muted-foreground mb-6">You don't have any past or cancelled site visits.</p>
              <Button asChild>
                <Link href="/dashboard/visit">Book a Site Visit</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
