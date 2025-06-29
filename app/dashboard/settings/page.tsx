"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useAuth } from "@/lib/context/auth-context"
import { supabase } from "@/lib/supabase/client"
import { toast } from "@/hooks/use-toast"
import { useTheme } from "@/components/theme-provider"

// Import our new components
import { SettingsHeader } from "@/components/settings/settings-header"
import { SettingsTabsNav } from "@/components/settings/settings-tabs-nav"
import { ProfileTab } from "@/components/settings/profile-tab"
import { SecurityTab } from "@/components/settings/security-tab"
import { NotificationsTab } from "@/components/settings/notifications-tab"
import { PrivacyTab } from "@/components/settings/privacy-tab"
import { getThemeStyles } from "@/components/settings/theme-styles"

export default function SettingsPage() {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme || "dark"
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { user, profile } = useAuth()
  const themeStyles = getThemeStyles(theme)

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Ghana",
    language: "English",
    currency: "GH₵",
    twoFactorEnabled: false,
    emailNotifications: true,
    marketingEmails: false,
    activityAlerts: true,
    loginAlerts: true,
    dataSharing: false,
    accountVisibility: "private",
  })

  // Fetch user preferences
  useEffect(() => {
    const fetchUserPreferences = async () => {
      if (!user) return

      setIsLoading(true)
      try {
        // Get email preferences
        const { data: emailPrefs } = await supabase
          .from("email_preferences")
          .select("*")
          .eq("user_id", user.id)
          .single()

        // Split the full name into first and last name
        let firstName = ""
        let lastName = ""

        if (profile?.full_name) {
          const nameParts = profile.full_name.split(" ")
          firstName = nameParts[0] || ""
          lastName = nameParts.slice(1).join(" ") || ""
        }

        setFormData({
          ...formData,
          firstName,
          lastName,
          email: profile?.email || user.email || "",
          phone: profile?.phone || "",
          emailNotifications: emailPrefs?.investment_notifications || true,
          marketingEmails: emailPrefs?.marketing || false,
          activityAlerts: emailPrefs?.project_updates || true,
          // Get currency from localStorage if available
          currency: localStorage.getItem("preferredCurrency") || "GH₵",
        })
      } catch (error) {
        console.error("Error fetching user preferences:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (typeof window !== "undefined") {
      fetchUserPreferences()
    }
  }, [user, profile])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle toggle changes
  const handleToggleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle save with currency propagation
  const handleSave = async () => {
    if (!user) return

    setIsSaving(true)

    try {
      // Save currency to localStorage
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("preferredCurrency", formData.currency)
      }

      // Dispatch a custom event to notify other components
      if (typeof window !== "undefined") {
        const event = new CustomEvent("currencyChanged", { detail: { currency: formData.currency } })
        window.dispatchEvent(event)
      }

      // Update profile in Supabase
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: `${formData.firstName} ${formData.lastName}`.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (profileError) throw profileError

      // Check if email preferences exist
      const { data: existingPrefs } = await supabase
        .from("email_preferences")
        .select("id")
        .eq("user_id", user.id)
        .single()

      if (existingPrefs) {
        // Update existing preferences
        await supabase
          .from("email_preferences")
          .update({
            marketing: formData.marketingEmails,
            project_updates: formData.activityAlerts,
            investment_notifications: formData.emailNotifications,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user.id)
      } else {
        // Insert new preferences
        await supabase.from("email_preferences").insert({
          user_id: user.id,
          marketing: formData.marketingEmails,
          project_updates: formData.activityAlerts,
          investment_notifications: formData.emailNotifications,
        })
      }

      setSaveSuccess(true)
      toast({
        title: "Settings saved",
        description: "Your profile settings have been updated successfully.",
        variant: "success",
      })

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
      setIsEditing(false)
    }
  }

  // Initialize currency from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const savedCurrency = localStorage.getItem("preferredCurrency")
      if (savedCurrency) {
        setFormData((prev) => ({
          ...prev,
          currency: savedCurrency,
        }))
      }
    }
  }, [])

  // Show loading state
  if (isLoading) {
    return (
      <div className={`p-6 ${themeStyles.background} overflow-auto min-h-screen`}>
        <div className="max-w-6xl mx-auto space-y-6 flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className={`${themeStyles.textSecondary} mt-2`}>Loading your settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`p-6 ${themeStyles.background} overflow-auto min-h-screen`}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Header */}
        <SettingsHeader
          title="Settings"
          description="Manage your account settings and preferences"
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          saveSuccess={saveSuccess}
          isSaving={isSaving}
          handleSave={handleSave}
          themeStyles={themeStyles}
        />

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-6" onValueChange={setActiveTab} value={activeTab}>
          <div
            className={`${themeStyles.backgroundCard} rounded-lg p-1 ${themeStyles.shadow} border ${themeStyles.border}`}
          >
            <SettingsTabsNav themeStyles={themeStyles} />
          </div>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <ProfileTab
              formData={formData}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              themeStyles={themeStyles}
            />
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <SecurityTab themeStyles={themeStyles} theme={theme} />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <NotificationsTab formData={formData} handleToggleChange={handleToggleChange} themeStyles={themeStyles} />
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <PrivacyTab
              formData={formData}
              handleInputChange={handleInputChange}
              handleToggleChange={handleToggleChange}
              themeStyles={themeStyles}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
