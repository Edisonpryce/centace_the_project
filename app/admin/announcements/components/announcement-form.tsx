"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { type Announcement, createAnnouncement, updateAnnouncement } from "@/lib/services/announcement-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

type AnnouncementFormProps = {
  announcement?: Announcement
  isEditing?: boolean
}

export default function AnnouncementForm({ announcement, isEditing = false }: AnnouncementFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: announcement?.title || "",
    content: announcement?.content || "",
    is_active: announcement?.is_active ?? true,
    priority: announcement?.priority || 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_active: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (isEditing && announcement) {
        await updateAnnouncement(announcement.id, {
          title: formData.title,
          content: formData.content,
          is_active: formData.is_active,
          priority: Number(formData.priority),
        })
        toast({
          title: "Announcement updated",
          description: "The announcement has been successfully updated",
        })
      } else {
        await createAnnouncement({
          title: formData.title,
          content: formData.content,
          is_active: formData.is_active,
          priority: Number(formData.priority),
        })
        toast({
          title: "Announcement created",
          description: "The announcement has been successfully created",
        })
      }
      router.push("/admin/announcements")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} announcement`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Announcement" : "Create Announcement"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Announcement title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Announcement content"
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority (higher numbers appear first)</Label>
            <Input
              id="priority"
              name="priority"
              type="number"
              value={formData.priority}
              onChange={handleChange}
              min={0}
              max={100}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="is_active" checked={formData.is_active} onCheckedChange={handleSwitchChange} />
            <Label htmlFor="is_active">Active</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditing ? "Update" : "Create"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
