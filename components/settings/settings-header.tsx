"use client"

import { Save, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SettingsHeaderProps {
  title: string
  description: string
  isEditing: boolean
  setIsEditing: (value: boolean) => void
  saveSuccess: boolean
  isSaving: boolean
  handleSave: () => void
  themeStyles: Record<string, string>
}

export function SettingsHeader({
  title,
  description,
  isEditing,
  setIsEditing,
  saveSuccess,
  isSaving,
  handleSave,
  themeStyles,
}: SettingsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className={`mt-1 ${themeStyles.textTertiary}`}>{description}</p>
      </div>

      {saveSuccess && (
        <div className="flex items-center bg-green-900/30 text-green-400 px-4 py-2 rounded-lg">
          <CheckCircle2 className="h-4 w-4 mr-2" />
          <span className="text-sm">Settings saved successfully</span>
        </div>
      )}

      {isEditing && (
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      )}
    </div>
  )
}
