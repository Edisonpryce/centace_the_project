"use client"

import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

interface NotificationsTabProps {
  formData: any
  handleToggleChange: (name: string, value: boolean) => void
  themeStyles: Record<string, string>
}

export function NotificationsTab({ formData, handleToggleChange, themeStyles }: NotificationsTabProps) {
  return (
    <div className="space-y-6">
      <div
        className={`${themeStyles.backgroundCard} rounded-xl p-6 ${themeStyles.shadow} border ${themeStyles.border}`}
      >
        <h2 className="text-xl font-bold mb-6">Email Notifications</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Email Notifications</Label>
              <p className={`text-sm ${themeStyles.textTertiary}`}>Receive email notifications about your account</p>
            </div>
            <Switch
              checked={formData.emailNotifications}
              onCheckedChange={(checked) => handleToggleChange("emailNotifications", checked)}
            />
          </div>

          <Separator className={themeStyles.border} />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Marketing Emails</Label>
              <p className={`text-sm ${themeStyles.textTertiary}`}>Receive emails about new features and offers</p>
            </div>
            <Switch
              checked={formData.marketingEmails}
              onCheckedChange={(checked) => handleToggleChange("marketingEmails", checked)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
