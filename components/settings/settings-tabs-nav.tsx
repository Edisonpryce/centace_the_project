"use client"

import { User, Lock, Bell, Shield } from "lucide-react"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SettingsTabsNavProps {
  themeStyles: Record<string, string>
}

export function SettingsTabsNav({ themeStyles }: SettingsTabsNavProps) {
  return (
    <TabsList className="grid grid-cols-4 w-full bg-transparent">
      <TabsTrigger
        value="profile"
        className={`data-[state=active]:${themeStyles.activeNav} ${themeStyles.text} rounded-md transition-all`}
      >
        <User className="h-4 w-4 mr-2" />
        Profile
      </TabsTrigger>
      <TabsTrigger
        value="security"
        className={`data-[state=active]:${themeStyles.activeNav} ${themeStyles.text} rounded-md transition-all`}
      >
        <Lock className="h-4 w-4 mr-2" />
        Security
      </TabsTrigger>
      <TabsTrigger
        value="notifications"
        className={`data-[state=active]:${themeStyles.activeNav} ${themeStyles.text} rounded-md transition-all`}
      >
        <Bell className="h-4 w-4 mr-2" />
        Notifications
      </TabsTrigger>
      <TabsTrigger
        value="privacy"
        className={`data-[state=active]:${themeStyles.activeNav} ${themeStyles.text} rounded-md transition-all`}
      >
        <Shield className="h-4 w-4 mr-2" />
        Privacy
      </TabsTrigger>
    </TabsList>
  )
}
