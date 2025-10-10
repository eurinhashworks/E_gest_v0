"use client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Shield } from "lucide-react"
import type { User } from "@/lib/mock-data"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

/**
 * @interface UserTableProps
 * @description Defines the props for the UserTable component.
 * @property {User[]} users - An array of user objects to display.
 * @property {(user: User) => void} onEdit - Callback function for editing a user.
 * @property {(id: string) => void} onDelete - Callback function for deleting a user.
 * @property {(user: User) => void} onViewPermissions - Callback function for viewing a user's permissions.
 */
interface UserTableProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (id: string) => void
  onViewPermissions: (user: User) => void
}

/**
 * @description A mapping of user role keys to their display labels.
 * @type {Record<User['role'], string>}
 */
const roleLabels = {
  admin: "Administrateur",
  manager: "Manager",
  sales: "Commercial",
  viewer: "Lecteur",
}

/**
 * @description A mapping of user role keys to their corresponding badge color classes.
 * @type {Record<User['role'], string>}
 */
const roleColors = {
  admin: "bg-red-100 text-red-800",
  manager: "bg-blue-100 text-blue-800",
  sales: "bg-green-100 text-green-800",
  viewer: "bg-gray-100 text-gray-800",
}

/**
 * @component UserTable
 * @description Renders a table of users with their details and action buttons.
 * @param {UserTableProps} props - The props for the component.
 * @returns {JSX.Element} The user table component.
 */
export function UserTable({ users, onEdit, onDelete, onViewPermissions }: UserTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Dernière connexion</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Badge className={roleColors[user.role]} variant="secondary">
                  {roleLabels[user.role]}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === "active" ? "default" : "secondary"}>
                  {user.status === "active" ? "Actif" : "Inactif"}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(user.lastLogin), "dd MMM yyyy HH:mm", {
                  locale: fr,
                })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onViewPermissions(user)}>
                    <Shield className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(user)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(user.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
