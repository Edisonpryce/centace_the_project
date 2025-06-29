"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Shield, UserX, Eye, Mail, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { updateUserRole, updateUserStatus } from "@/lib/services/admin-service"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface UsersTableProps {
  users: any[]
  isSuperAdmin: boolean
}

export default function UsersTable({ users, isSuperAdmin }: UsersTableProps) {
  const { toast } = useToast()
  const [tableUsers, setTableUsers] = useState(users)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isPromoteDialogOpen, setIsPromoteDialogOpen] = useState(false)
  const [isDemoteDialogOpen, setIsDemoteDialogOpen] = useState(false)
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Add a check for empty users array
  if (!users || users.length === 0) {
    return (
      <div className="rounded-md border">
        <div className="p-4">
          <p className="text-center text-muted-foreground">No users found</p>
        </div>
      </div>
    )
  }

  const handlePromoteUser = async () => {
    if (!selectedUser) return

    setIsLoading(true)
    try {
      await updateUserRole(selectedUser.id, "admin")

      // Update local state
      setTableUsers((prev) =>
        prev.map((user) => (user.id === selectedUser.id ? { ...user, auth_roles: [{ role: "admin" }] } : user)),
      )

      toast({
        title: "User promoted",
        description: `${selectedUser.full_name} has been promoted to admin.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to promote user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsPromoteDialogOpen(false)
    }
  }

  const handleDemoteUser = async () => {
    if (!selectedUser) return

    setIsLoading(true)
    try {
      await updateUserRole(selectedUser.id, "user")

      // Update local state
      setTableUsers((prev) =>
        prev.map((user) => (user.id === selectedUser.id ? { ...user, auth_roles: [{ role: "user" }] } : user)),
      )

      toast({
        title: "User demoted",
        description: `${selectedUser.full_name} has been demoted to regular user.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to demote user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsDemoteDialogOpen(false)
    }
  }

  const handleToggleUserStatus = async () => {
    if (!selectedUser) return

    const newStatus = selectedUser.is_active === false

    setIsLoading(true)
    try {
      await updateUserStatus(selectedUser.id, newStatus)

      // Update local state
      setTableUsers((prev) =>
        prev.map((user) => (user.id === selectedUser.id ? { ...user, is_active: newStatus } : user)),
      )

      toast({
        title: newStatus ? "User activated" : "User deactivated",
        description: `${selectedUser.full_name} has been ${newStatus ? "activated" : "deactivated"}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${newStatus ? "activate" : "deactivate"} user. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsDeactivateDialogOpen(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getUserRole = (user: any) => {
    if (!user.auth_roles || user.auth_roles.length === 0) {
      return "user"
    }
    return user.auth_roles[0]?.role || "user"
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url || "/placeholder.svg"}
                          alt={user.full_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-medium">
                          {user.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{user.full_name || "Unnamed User"}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {getUserRole(user) === "super_admin" && <Badge variant="destructive">Super Admin</Badge>}
                  {getUserRole(user) === "admin" && <Badge variant="default">Admin</Badge>}
                  {getUserRole(user) === "user" && <Badge variant="outline">User</Badge>}
                </TableCell>
                <TableCell>
                  {user.is_active === false ? (
                    <Badge variant="destructive">Inactive</Badge>
                  ) : (
                    <Badge variant="success">Active</Badge>
                  )}
                </TableCell>
                <TableCell>{formatDate(user.created_at)}</TableCell>
                <TableCell>{user.last_login ? formatDate(user.last_login) : "Never"}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => (window.location.href = `/admin/users/${user.id}`)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

                      {/* Role management (Super Admin only) */}
                      {isSuperAdmin && getUserRole(user) !== "super_admin" && (
                        <>
                          {getUserRole(user) !== "admin" ? (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user)
                                setIsPromoteDialogOpen(true)
                              }}
                            >
                              <Shield className="h-4 w-4 mr-2" />
                              Promote to Admin
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user)
                                setIsDemoteDialogOpen(true)
                              }}
                            >
                              <Shield className="h-4 w-4 mr-2" />
                              Revoke Admin
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                        </>
                      )}

                      {/* Account status */}
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedUser(user)
                          setIsDeactivateDialogOpen(true)
                        }}
                        className="text-red-600 dark:text-red-400"
                      >
                        {user.is_active === false ? (
                          <>
                            <Shield className="h-4 w-4 mr-2" />
                            Activate Account
                          </>
                        ) : (
                          <>
                            <UserX className="h-4 w-4 mr-2" />
                            Deactivate Account
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Promote Dialog */}
      <Dialog open={isPromoteDialogOpen} onOpenChange={setIsPromoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Promote User to Admin</DialogTitle>
            <DialogDescription>
              This will give {selectedUser?.full_name || "this user"} administrative privileges. They will be able to
              manage content, users, and settings.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md border border-yellow-200 dark:border-yellow-800">
            <div className="flex gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                Admin users can manage platform content and settings. Only promote trusted individuals.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPromoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePromoteUser} disabled={isLoading}>
              {isLoading ? "Promoting..." : "Promote User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Demote Dialog */}
      <Dialog open={isDemoteDialogOpen} onOpenChange={setIsDemoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke Admin Privileges</DialogTitle>
            <DialogDescription>
              This will remove administrative privileges from {selectedUser?.full_name || "this user"}. They will no
              longer be able to access the admin dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDemoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDemoteUser} disabled={isLoading}>
              {isLoading ? "Revoking..." : "Revoke Admin"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deactivate/Activate Dialog */}
      <Dialog open={isDeactivateDialogOpen} onOpenChange={setIsDeactivateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedUser?.is_active === false ? "Activate Account" : "Deactivate Account"}</DialogTitle>
            <DialogDescription>
              {selectedUser?.is_active === false
                ? `This will re-enable ${selectedUser?.full_name || "this user"}'s account. They will be able to log in and use the platform again.`
                : `This will temporarily disable ${selectedUser?.full_name || "this user"}'s account. They will not be able to log in until the account is reactivated.`}
            </DialogDescription>
          </DialogHeader>
          {selectedUser?.is_active !== false && (
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800">
              <div className="flex gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-800 dark:text-red-300">
                  Deactivated users will be logged out and unable to access their account.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeactivateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={selectedUser?.is_active === false ? "default" : "destructive"}
              onClick={handleToggleUserStatus}
              disabled={isLoading}
            >
              {isLoading
                ? selectedUser?.is_active === false
                  ? "Activating..."
                  : "Deactivating..."
                : selectedUser?.is_active === false
                  ? "Activate Account"
                  : "Deactivate Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
