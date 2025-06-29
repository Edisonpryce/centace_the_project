"use client"

import { useState } from "react"
import { type Announcement, deleteAnnouncement, updateAnnouncement } from "@/lib/services/announcement-service"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

export default function AnnouncementsTable({ announcements: initialAnnouncements }: { announcements: Announcement[] }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [announcementToDelete, setAnnouncementToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const updatedAnnouncement = await updateAnnouncement(id, { is_active: !currentStatus })
      setAnnouncements(announcements.map((a) => (a.id === id ? updatedAnnouncement : a)))
      toast({
        title: "Status updated",
        description: `Announcement is now ${!currentStatus ? "active" : "inactive"}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update announcement status",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (!announcementToDelete) return

    try {
      await deleteAnnouncement(announcementToDelete)
      setAnnouncements(announcements.filter((a) => a.id !== announcementToDelete))
      toast({
        title: "Announcement deleted",
        description: "The announcement has been successfully deleted",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete announcement",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
      setAnnouncementToDelete(null)
    }
  }

  const confirmDelete = (id: string) => {
    setAnnouncementToDelete(id)
    setDeleteDialogOpen(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {announcements.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                No announcements found. Create your first announcement.
              </TableCell>
            </TableRow>
          ) : (
            announcements.map((announcement) => (
              <TableRow key={announcement.id}>
                <TableCell className="font-medium">{announcement.title}</TableCell>
                <TableCell className="max-w-xs truncate">{announcement.content}</TableCell>
                <TableCell>{announcement.priority}</TableCell>
                <TableCell>{formatDate(announcement.created_at)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={announcement.is_active}
                      onCheckedChange={() => handleToggleActive(announcement.id, announcement.is_active)}
                    />
                    <span className="text-sm">
                      {announcement.is_active ? (
                        <span className="flex items-center text-green-600">
                          <Eye className="h-4 w-4 mr-1" /> Active
                        </span>
                      ) : (
                        <span className="flex items-center text-gray-500">
                          <EyeOff className="h-4 w-4 mr-1" /> Inactive
                        </span>
                      )}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/admin/announcements/edit/${announcement.id}`}>
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" onClick={() => confirmDelete(announcement.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the announcement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
