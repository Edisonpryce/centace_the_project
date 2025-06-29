"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SessionTimeoutWarningProps {
  show: boolean
  timeRemaining: number
  formattedTime: string
  onExtend: () => void
  onLogout: () => void
}

export function SessionTimeoutWarning({
  show,
  timeRemaining,
  formattedTime,
  onExtend,
  onLogout,
}: SessionTimeoutWarningProps) {
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(100)

  // Update dialog open state when show prop changes
  useEffect(() => {
    setOpen(show)
  }, [show])

  // Calculate progress bar percentage
  useEffect(() => {
    if (show) {
      // Use 2 minutes warning time (120000ms)
      const warningTime = 120000
      const percentage = Math.min(100, Math.max(0, (timeRemaining / warningTime) * 100))
      setProgress(percentage)
    }
  }, [timeRemaining, show])

  // Handle extend session
  const handleExtend = () => {
    onExtend()
    setOpen(false)
  }

  // Handle logout
  const handleLogout = () => {
    onLogout()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Session Timeout Warning
          </DialogTitle>
          <DialogDescription>Your session is about to expire due to inactivity.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="h-6 w-6 text-amber-500" />
            <span className="text-xl font-mono">{formattedTime}</span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-amber-500 h-2.5 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
            You will be automatically logged out when the timer reaches zero.
          </p>
        </div>

        <DialogFooter className="flex sm:justify-between">
          <Button variant="outline" onClick={handleLogout}>
            Logout Now
          </Button>
          <Button onClick={handleExtend}>Stay Logged In</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
