"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { UserTable } from "@/components/users/user-table"
import { UserForm } from "@/components/users/user-form"
import { PermissionsDialog } from "@/components/users/permissions-dialog"
import { mockUsers, type User } from "@/lib/mock-data"
import { Plus, Search, Users, UserCheck, UserX, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

/**
 * @page UsersPage
 * @description This page provides a comprehensive interface for managing users.
 * It includes functionality for viewing, creating, editing, and deleting users,
 * as well as viewing permissions and displaying key user metrics.
 *
 * @state {User[]} users - The list of all users.
 * @state {string} searchQuery - The current search term for filtering users.
 * @state {User | undefined} selectedUser - The user currently selected for editing.
 * @state {User | null} permissionsUser - The user whose permissions are being viewed.
 * @state {boolean} isFormOpen - Controls the visibility of the user creation/edit form dialog.
 * @state {boolean} isPermissionsOpen - Controls the visibility of the permissions view dialog.
 *
 * @returns {JSX.Element} The users management page component.
 */
export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | undefined>()
  const [permissionsUser, setPermissionsUser] = useState<User | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false)
  const { toast } = useToast()

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  /** @function handleSave - Handles saving user data from the form, for both creation and updates. */
  const handleSave = (userData: Partial<User>) => {
    if (selectedUser) {
      setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, ...userData } : u)))
      toast({
        title: "Utilisateur modifié",
        description: "Les modifications ont été enregistrées avec succès.",
      })
    } else {
      const newUser: User = {
        id: String(users.length + 1),
        ...userData,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      } as User
      setUsers([...users, newUser])
      toast({
        title: "Utilisateur créé",
        description: "Le nouvel utilisateur a été ajouté avec succès.",
      })
    }
    setSelectedUser(undefined)
  }

  /** @function handleEdit - Opens the form dialog to edit an existing user. */
  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setIsFormOpen(true)
  }

  /** @function handleDelete - Deletes a user from the state and shows a toast notification. */
  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
    toast({
      title: "Utilisateur supprimé",
      description: "L'utilisateur a été supprimé avec succès.",
      variant: "destructive",
    })
  }

  /** @function handleViewPermissions - Opens the dialog to view a user's permissions. */
  const handleViewPermissions = (user: User) => {
    setPermissionsUser(user)
    setIsPermissionsOpen(true)
  }

  /** @function handleAddNew - Opens the form dialog to create a new user. */
  const handleAddNew = () => {
    setSelectedUser(undefined)
    setIsFormOpen(true)
  }

  const activeUsers = users.filter((u) => u.status === "active").length
  const inactiveUsers = users.filter((u) => u.status === "inactive").length
  const adminUsers = users.filter((u) => u.role === "admin").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
        <p className="text-muted-foreground">Gérez les utilisateurs et leurs permissions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actifs</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactifs</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrateurs</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminUsers}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un utilisateur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" />
              Nouvel utilisateur
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <UserTable
            users={filteredUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewPermissions={handleViewPermissions}
          />
        </CardContent>
      </Card>

      <UserForm user={selectedUser} open={isFormOpen} onOpenChange={setIsFormOpen} onSave={handleSave} />

      <PermissionsDialog user={permissionsUser} open={isPermissionsOpen} onOpenChange={setIsPermissionsOpen} />
    </div>
  )
}
