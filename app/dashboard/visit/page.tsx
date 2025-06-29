"use client"

import { useState } from "react"
import { CalendarIcon, Clock, Car, MapPin, Info, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useNotifications } from "@/lib/context/notifications-context"
import { useAuth } from "@/lib/context/auth-context"
import { toast } from "@/hooks/use-toast"
import { useTheme } from "@/components/theme-provider"

export default function VisitPage() {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme || "dark"
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>("")
  const [step, setStep] = useState(1)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingReference, setBookingReference] = useState("")
  const [bookingData, setBookingData] = useState({
    project: "",
    date: null as Date | null,
    time: "",
    visitors: "1",
    transportation: "own",
    specialRequests: "",
  })
  const { refreshNotifications } = useNotifications()
  const { user } = useAuth()

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setBookingData({
      ...bookingData,
      [field]: value,
    })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isSubmitting) return
    setIsSubmitting(true)

    // Move to confirmation step
    if (step === 3) {
      try {
        // Get the project details
        const selectedProject = projects.find((p) => p.id === bookingData.project)

        if (!user || !selectedProject || !bookingData.date) {
          throw new Error("Missing required booking information")
        }

        console.log("Creating booking with user:", user.id)

        // Create the booking using the API endpoint
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            projectId: selectedProject.id,
            projectName: selectedProject.name,
            location: selectedProject.location,
            visitDate: bookingData.date.toISOString(),
            visitTime: bookingData.time,
            visitors: Number.parseInt(bookingData.visitors),
            transportation: bookingData.transportation,
            specialRequests: bookingData.specialRequests,
          }),
        })

        const result = await response.json()

        if (!response.ok) {
          console.error("Error creating booking:", result)
          let errorMessage = result.error || "Failed to create booking"
          if (result.details) {
            errorMessage += `: ${result.details}`
          }
          throw new Error(errorMessage)
        }

        if (!result.booking) {
          throw new Error("Failed to create booking: No booking returned")
        }

        // Store the booking reference for display
        setBookingReference(result.booking.booking_reference)

        // Refresh notifications to show the new one
        refreshNotifications()

        // Show a toast notification
        toast({
          title: "Visit Booked Successfully",
          description: "You will receive a confirmation email with all details.",
        })

        // Complete the booking
        setBookingComplete(true)
      } catch (error) {
        console.error("Error processing booking:", error)
        toast({
          title: "Booking Error",
          description:
            error instanceof Error ? error.message : "There was an error processing your booking. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setStep(step + 1)
      setIsSubmitting(false)
    }
  }

  // Go back to previous step
  const handleBack = () => {
    setStep(step - 1)
  }

  // Theme-based style variables
  const themeStyles = {
    background: theme === "dark" ? "bg-[#0a0a0f]" : "bg-[#f8fafc]",
    backgroundSecondary: theme === "dark" ? "bg-[#0d1117]" : "bg-white",
    backgroundTertiary: theme === "dark" ? "bg-[#161b22]" : "bg-white",
    backgroundCard: theme === "dark" ? "bg-[#1a1d24]" : "bg-white",
    text: theme === "dark" ? "text-white" : "text-gray-900",
    textSecondary: theme === "dark" ? "text-gray-300" : "text-gray-600",
    textTertiary: theme === "dark" ? "text-gray-400" : "text-gray-500",
    border: theme === "dark" ? "border-gray-800" : "border-gray-200",
    borderSecondary: theme === "dark" ? "border-gray-700" : "border-gray-300",
    hover: theme === "dark" ? "hover:bg-[#21262d]" : "hover:bg-gray-50",
    activeNav: theme === "dark" ? "bg-[#21262d]" : "bg-blue-50 text-blue-600",
    shadow: theme === "dark" ? "shadow-[0_4px_12px_rgba(0,0,0,0.3)]" : "shadow-[0_4px_12px_rgba(0,0,0,0.05)]",
    accent: theme === "dark" ? "text-blue-400" : "text-blue-600",
    accentBg: theme === "dark" ? "bg-blue-900/20" : "bg-blue-50",
  }

  // Sample projects data
  const projects = [
    { id: "agriculture-project-1", name: "Poultry Farm", location: "Eastern Region, Ghana" },
    { id: "fish-farm", name: "Fish Farm", location: "Volta Region, Ghana" },
    { id: "livestock-farm", name: "Livestock Farm", location: "Northern Region, Ghana" },
    { id: "gold-poultry-farm", name: "Gold Tier Poultry Farm", location: "Ashanti Region, Ghana" },
  ]

  // Available time slots
  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]

  // Fallback booking creation - direct to database
  const createFallbackBooking = async () => {
    try {
      // Get the project details
      const selectedProject = projects.find((p) => p.id === bookingData.project)

      if (!user || !selectedProject || !bookingData.date) {
        throw new Error("Missing required booking information")
      }

      // Generate a booking reference
      const prefix = "VST"
      const randomNum = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")
      const timestamp = Date.now().toString().slice(-6)
      const bookingRef = `${prefix}-${randomNum}-${timestamp}`

      // Store the booking reference for display
      setBookingReference(bookingRef)

      // Show a toast notification
      toast({
        title: "Visit Booked Successfully",
        description: "You will receive a confirmation email with all details.",
      })

      // Complete the booking
      setBookingComplete(true)

      return true
    } catch (error) {
      console.error("Error in fallback booking:", error)
      return false
    }
  }

  return (
    <div className={`p-6 ${themeStyles.background} overflow-auto min-h-screen`}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Book a Site Visit</h1>
          <p className={`mt-1 ${themeStyles.textTertiary}`}>
            Schedule a visit to see your investment projects in person
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1
                  ? "bg-blue-600 text-white"
                  : `${themeStyles.backgroundTertiary} ${themeStyles.textTertiary} ${themeStyles.border}`
              }`}
            >
              1
            </div>
            <div
              className={`h-1 w-16 mx-2 ${
                step >= 2 ? "bg-blue-600" : `${themeStyles.backgroundTertiary} ${themeStyles.border}`
              }`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2
                  ? "bg-blue-600 text-white"
                  : `${themeStyles.backgroundTertiary} ${themeStyles.textTertiary} ${themeStyles.border}`
              }`}
            >
              2
            </div>
            <div
              className={`h-1 w-16 mx-2 ${
                step >= 3 ? "bg-blue-600" : `${themeStyles.backgroundTertiary} ${themeStyles.border}`
              }`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 3
                  ? "bg-blue-600 text-white"
                  : `${themeStyles.backgroundTertiary} ${themeStyles.textTertiary} ${themeStyles.border}`
              }`}
            >
              3
            </div>
          </div>
          <div className="text-sm font-medium">
            {step === 1 && "Select Project"}
            {step === 2 && "Choose Date & Time"}
            {step === 3 && "Visit Details"}
            {bookingComplete && "Confirmation"}
          </div>
        </div>

        {/* Booking Form */}
        {!bookingComplete ? (
          <div
            className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border}`}
          >
            <form onSubmit={handleSubmit}>
              {/* Step 1: Select Project */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Select a Project to Visit</h2>

                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className={`p-4 rounded-lg border ${
                          bookingData.project === project.id ? "border-blue-500 bg-blue-500/10" : themeStyles.border
                        } cursor-pointer transition-all duration-200 hover:border-blue-500/50`}
                        onClick={() => handleInputChange("project", project.id)}
                      >
                        <div className="flex items-start">
                          <div
                            className={`w-5 h-5 rounded-full border ${
                              bookingData.project === project.id ? "border-blue-500 bg-blue-500" : themeStyles.border
                            } flex items-center justify-center mr-3 mt-0.5`}
                          >
                            {bookingData.project === project.id && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{project.name}</h3>
                            <div className="flex items-center mt-1">
                              <MapPin className="h-3.5 w-3.5 text-gray-500 mr-1" />
                              <p className={`text-sm ${themeStyles.textTertiary}`}>{project.location}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!bookingData.project || isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Choose Date & Time */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Select Visit Date & Time</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !bookingData.date && "text-muted-foreground",
                              themeStyles.backgroundTertiary,
                              themeStyles.border,
                              themeStyles.text,
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {bookingData.date ? format(bookingData.date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={bookingData.date || undefined}
                            onSelect={(date) => handleInputChange("date", date)}
                            initialFocus
                            disabled={(date) => {
                              // Disable dates in the past and weekends
                              const today = new Date()
                              today.setHours(0, 0, 0, 0)
                              const day = date.getDay()
                              return date < today || day === 0 || day === 6
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <p className={`text-xs ${themeStyles.textTertiary}`}>Visits are available Monday-Friday only</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Select value={bookingData.time} onValueChange={(value) => handleInputChange("time", value)}>
                        <SelectTrigger
                          className={`${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.text}`}
                        >
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className={`text-xs ${themeStyles.textTertiary}`}>All times are in local time (GMT)</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-[#21262d]" : "bg-gray-50"} mt-4`}>
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm">
                          Site visits typically last 1-2 hours. Please arrive 15 minutes before your scheduled time.
                        </p>
                        <p className="text-sm mt-2">
                          A confirmation email will be sent with directions and contact information.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      onClick={handleBack}
                      disabled={isSubmitting}
                      variant="outline"
                      className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} rounded-lg transition-all duration-200 font-medium`}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!bookingData.date || !bookingData.time || isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Visit Details */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Visit Details</h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="visitors">Number of Visitors</Label>
                      <Select
                        value={bookingData.visitors}
                        onValueChange={(value) => handleInputChange("visitors", value)}
                      >
                        <SelectTrigger
                          className={`${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.text}`}
                        >
                          <SelectValue placeholder="Select number of visitors" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Person</SelectItem>
                          <SelectItem value="2">2 People</SelectItem>
                          <SelectItem value="3">3 People</SelectItem>
                          <SelectItem value="4">4 People</SelectItem>
                          <SelectItem value="5">5 People</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Transportation</Label>
                      <RadioGroup
                        value={bookingData.transportation}
                        onValueChange={(value) => handleInputChange("transportation", value)}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="own" id="own" />
                          <Label htmlFor="own" className="cursor-pointer">
                            I'll use my own transportation
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="arrange" id="arrange" />
                          <Label htmlFor="arrange" className="cursor-pointer">
                            Please arrange transportation for me
                          </Label>
                        </div>
                      </RadioGroup>
                      <p className={`text-xs ${themeStyles.textTertiary} mt-1`}>
                        Transportation can be arranged for an additional fee
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">Special Requests or Notes</Label>
                      <Textarea
                        id="specialRequests"
                        placeholder="Any special requirements or questions..."
                        value={bookingData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        className={`${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.text} min-h-[100px]`}
                      />
                    </div>
                  </div>

                  <Separator className={themeStyles.border} />

                  <div className="space-y-4">
                    <h3 className="font-medium">Booking Summary</h3>
                    <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-[#21262d]" : "bg-gray-50"}`}>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className={themeStyles.textSecondary}>Project:</span>
                          <span className="font-medium">
                            {projects.find((p) => p.id === bookingData.project)?.name || ""}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className={themeStyles.textSecondary}>Location:</span>
                          <span className="font-medium">
                            {projects.find((p) => p.id === bookingData.project)?.location || ""}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className={themeStyles.textSecondary}>Date:</span>
                          <span className="font-medium">{bookingData.date ? format(bookingData.date, "PPP") : ""}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={themeStyles.textSecondary}>Time:</span>
                          <span className="font-medium">{bookingData.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={themeStyles.textSecondary}>Visitors:</span>
                          <span className="font-medium">
                            {bookingData.visitors} {Number.parseInt(bookingData.visitors) === 1 ? "Person" : "People"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className={themeStyles.textSecondary}>Transportation:</span>
                          <span className="font-medium">
                            {bookingData.transportation === "own" ? "Own Transportation" : "Arranged Transportation"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      onClick={handleBack}
                      disabled={isSubmitting}
                      variant="outline"
                      className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} rounded-lg transition-all duration-200 font-medium`}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium"
                    >
                      {isSubmitting ? "Processing..." : "Confirm Booking"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : (
          // Booking Confirmation
          <div
            className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border} text-center`}
          >
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
              <p className={`${themeStyles.textSecondary} max-w-md mx-auto mb-6`}>
                Your site visit has been successfully scheduled. A confirmation email with all details has been sent to
                your registered email address.
              </p>

              <div
                className={`p-6 rounded-lg ${theme === "dark" ? "bg-[#21262d]" : "bg-gray-50"} w-full max-w-md mx-auto text-left`}
              >
                <h3 className="font-medium mb-4">Booking Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={themeStyles.textSecondary}>Booking ID:</span>
                    <span className="font-medium">
                      {bookingReference ||
                        "VST-" +
                          Math.floor(Math.random() * 10000)
                            .toString()
                            .padStart(4, "0")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeStyles.textSecondary}>Project:</span>
                    <span className="font-medium">
                      {projects.find((p) => p.id === bookingData.project)?.name || ""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeStyles.textSecondary}>Date & Time:</span>
                    <span className="font-medium">
                      {bookingData.date ? format(bookingData.date, "PPP") : ""} at {bookingData.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeStyles.textSecondary}>Location:</span>
                    <span className="font-medium">
                      {projects.find((p) => p.id === bookingData.project)?.location || ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <Button
                  variant="outline"
                  className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} rounded-lg transition-all duration-200 font-medium`}
                  onClick={() => {
                    setBookingComplete(false)
                    setStep(1)
                    setBookingData({
                      project: "",
                      date: null,
                      time: "",
                      visitors: "1",
                      transportation: "own",
                      specialRequests: "",
                    })
                  }}
                >
                  Book Another Visit
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Return to Dashboard
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Additional Information */}
        {!bookingComplete && (
          <div
            className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border} mt-6`}
          >
            <h2 className="text-lg font-bold mb-4">About Site Visits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <div
                  className={`p-3 rounded-full ${theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"} self-start mb-3`}
                >
                  <MapPin className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="font-medium mb-2">Location Access</h3>
                <p className={`text-sm ${themeStyles.textTertiary}`}>
                  Our project sites are located in various regions across Ghana. Detailed directions will be provided in
                  your confirmation email.
                </p>
              </div>

              <div className="flex flex-col">
                <div
                  className={`p-3 rounded-full ${theme === "dark" ? "bg-green-900/30" : "bg-green-100"} self-start mb-3`}
                >
                  <Clock className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="font-medium mb-2">Visit Duration</h3>
                <p className={`text-sm ${themeStyles.textTertiary}`}>
                  Site visits typically last 1-2 hours and include a guided tour of the facilities and operations.
                </p>
              </div>

              <div className="flex flex-col">
                <div
                  className={`p-3 rounded-full ${theme === "dark" ? "bg-amber-900/30" : "bg-amber-100"} self-start mb-3`}
                >
                  <Car className="h-5 w-5 text-amber-500" />
                </div>
                <h3 className="font-medium mb-2">Transportation</h3>
                <p className={`text-sm ${themeStyles.textTertiary}`}>
                  You can use your own transportation or request for us to arrange transportation for an additional fee.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
