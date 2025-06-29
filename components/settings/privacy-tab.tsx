"use client"

import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface PrivacyTabProps {
  formData: any
  handleInputChange: (e: any) => void
  handleToggleChange: (name: string, value: boolean) => void
  themeStyles: Record<string, string>
}

export function PrivacyTab({ formData, handleInputChange, handleToggleChange, themeStyles }: PrivacyTabProps) {
  return (
    <div className="space-y-6">
      <div
        className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border}`}
      >
        <h2 className="text-xl font-bold mb-6">Privacy Settings</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Data Sharing</Label>
              <p className={`text-sm ${themeStyles.textTertiary}`}>Allow us to share your data with trusted partners</p>
            </div>
            <Switch
              checked={formData.dataSharing}
              onCheckedChange={(checked) => handleToggleChange("dataSharing", checked)}
            />
          </div>

          <Separator className={themeStyles.border} />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Account Visibility</Label>
              <p className={`text-sm ${themeStyles.textTertiary}`}>Control who can see your investment activity</p>
            </div>
            <Select
              value={formData.accountVisibility}
              onValueChange={(value) => handleInputChange({ target: { name: "accountVisibility", value } })}
            >
              <SelectTrigger
                className={`${themeStyles.backgroundTertiary} ${themeStyles.border} ${themeStyles.text} w-[180px]`}
              >
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="friends">Friends Only</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className={themeStyles.border} />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Cookies</Label>
              <p className={`text-sm ${themeStyles.textTertiary}`}>Manage cookie preferences</p>
            </div>
            <Button
              variant="outline"
              className={`${themeStyles.text} ${themeStyles.border} ${themeStyles.backgroundTertiary} ${themeStyles.hover} rounded-lg transition-all duration-200 font-medium`}
            >
              Manage Cookies
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
