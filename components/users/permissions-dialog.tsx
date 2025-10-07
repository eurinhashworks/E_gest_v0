"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/lib/mock-data"
import { Check, X } from "lucide-react"

interface PermissionsDialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PermissionsDialog({ user, open, onOpenChange }: PermissionsDialogProps) {
  if (!user) return null

  const modules = [
    { key: "products", label: "Produits" },
    { key: "sales", label: "Ventes" },
    { key: "clients", label: "Clients" },
    { key: "suppliers", label: "Fournisseurs" },
    { key: "finances", label: "Finances" },
    { key: "reports", label: "Rapports" },
    { key: "settings", label: "Paramètres" },
    { key: "users", label: "Utilisateurs" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Permissions de {user.name}
            <Badge className="ml-2" variant="secondary">
              {user.role}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Module</th>
                  <th className="p-3 text-center font-medium">Voir</th>
                  <th className="p-3 text-center font-medium">Créer</th>
                  <th className="p-3 text-center font-medium">Modifier</th>
                  <th className="p-3 text-center font-medium">Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((module) => {
                  const perms = user.permissions[module.key as keyof typeof user.permissions]
                  return (
                    <tr key={module.key} className="border-b">
                      <td className="p-3 font-medium">{module.label}</td>
                      <td className="p-3 text-center">
                        {"view" in perms && perms.view ? (
                          <Check className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-red-600 mx-auto" />
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {"create" in perms && perms.create ? (
                          <Check className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-red-600 mx-auto" />
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {"edit" in perms && perms.edit ? (
                          <Check className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-red-600 mx-auto" />
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {"delete" in perms && perms.delete ? (
                          <Check className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-red-600 mx-auto" />
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
