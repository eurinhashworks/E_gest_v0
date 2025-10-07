"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { type User, defaultPermissions } from "@/lib/mock-data"

interface UserFormProps {
  user?: User
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (user: Partial<User>) => void
}

export function UserForm({ user, open, onOpenChange, onSave }: UserFormProps) {
  const [formData, setFormData] = useState<Partial<User>>(
    user || {
      name: "",
      email: "",
      phone: "",
      role: "viewer",
      status: "active",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const userData = {
      ...formData,
      permissions: defaultPermissions[formData.role as keyof typeof defaultPermissions],
    }
    onSave(userData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{user ? "Modifier l'utilisateur" : "Nouvel utilisateur"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      role: value as User["role"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="sales">Commercial</SelectItem>
                    <SelectItem value="viewer">Lecteur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value as User["status"],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg border p-4 bg-muted/50">
              <h4 className="font-medium mb-2">Permissions par rôle</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <strong>Administrateur:</strong> Accès complet à toutes les fonctionnalités
                </p>
                <p>
                  <strong>Manager:</strong> Gestion complète sauf suppression et paramètres
                </p>
                <p>
                  <strong>Commercial:</strong> Gestion des ventes et clients uniquement
                </p>
                <p>
                  <strong>Lecteur:</strong> Consultation uniquement, aucune modification
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">{user ? "Enregistrer" : "Créer"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
