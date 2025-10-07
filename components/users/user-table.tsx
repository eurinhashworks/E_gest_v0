"use client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Shield } from "lucide-react"
import type { User } from "@/lib/mock-data"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface UserTableProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (id: string) => void
  onViewPermissions: (user: User) => void
}

const roleLabels = {
  admin: "Administrateur",
  manager: "Manager",
  sales: "Commercial",
  viewer: "Lecteur",
}

const roleColors = {
  admin: "bg-red-100 text-red-800",
  manager: "bg-blue-100 text-blue-800",
  sales: "bg-green-100 text-green-800",
  viewer: "bg-gray-100 text-gray-800",
}

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
