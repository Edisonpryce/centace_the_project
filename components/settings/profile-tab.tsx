"use client"

import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProfileTabProps {
  formData: any
  handleInputChange: (e: any) => void
  isEditing: boolean
  setIsEditing: (value: boolean) => void
  themeStyles: Record<string, string>
}

export function ProfileTab({ formData, handleInputChange, isEditing, setIsEditing, themeStyles }: ProfileTabProps) {
  return (
    <div className="space-y-6">
      <div
        className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Profile Information</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} rounded-lg transition-all duration-200 font-medium`}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.text}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.text}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                disabled={!isEditing}
                value={formData.country}
                onValueChange={(value) => handleInputChange({ target: { name: "country", value } })}
              >
                <SelectTrigger
                  className={`${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.text}`}
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ghana">Ghana</SelectItem>
                  <SelectItem value="Nigeria">Nigeria</SelectItem>
                  <SelectItem value="Kenya">Kenya</SelectItem>
                  <SelectItem value="South Africa">South Africa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.text}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.text}`}
              />
              {isEditing && (
                <p className="text-xs text-amber-500 mt-1">
                  Note: Phone number is displayed for reference only and not saved to your profile.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Select
                disabled={!isEditing}
                value={formData.language}
                onValueChange={(value) => handleInputChange({ target: { name: "language", value } })}
              >
                <SelectTrigger
                  className={`${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.text}`}
                >
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border}`}
      >
        <h2 className="text-xl font-bold mb-6">Preferences</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Currency</Label>
              <p className={`text-sm ${themeStyles.textTertiary}`}>Set your preferred currency for transactions</p>
            </div>
            <Select
              disabled={!isEditing}
              value={formData.currency}
              onValueChange={(value) => {
                handleInputChange({ target: { name: "currency", value } })
              }}
            >
              <SelectTrigger
                className={`${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.text} w-[180px]`}
              >
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GH₵">Ghana Cedi (GH₵)</SelectItem>
                <SelectItem value="USD">US Dollar ($)</SelectItem>
                <SelectItem value="EUR">Euro (€)</SelectItem>
                <SelectItem value="GBP">British Pound (£)</SelectItem>
                <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className={themeStyles.border} />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Time Zone</Label>
              <p className={`text-sm ${themeStyles.textTertiary}`}>Set your local time zone</p>
            </div>
            <Select disabled={!isEditing} defaultValue="GMT">
              <SelectTrigger
                className={`${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.text} w-[180px]`}
              >
                <SelectValue placeholder="Select time zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GMT">GMT (UTC+0)</SelectItem>
                <SelectItem value="WAT">WAT (UTC+1)</SelectItem>
                <SelectItem value="CAT">CAT (UTC+2)</SelectItem>
                <SelectItem value="EAT">EAT (UTC+3)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
