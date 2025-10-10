"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, Mail, Phone } from "lucide-react"
import type { Supplier } from "@/lib/mock-data"

/**
 * @interface SupplierTableProps
 * @description Defines the props for the SupplierTable component.
 * @property {Supplier[]} suppliers - An array of supplier objects to display.
 * @property {(supplier: Supplier) => void} onEdit - Callback function for editing a supplier.
 * @property {(supplier: Supplier) => void} onDelete - Callback function for deleting a supplier.
 * @property {(supplier: Supplier) => void} onView - Callback function for viewing a supplier's details.
 */
interface SupplierTableProps {
  suppliers: Supplier[]
  onEdit: (supplier: Supplier) => void
  onDelete: (supplier: Supplier) => void
  onView: (supplier: Supplier) => void
}

/**
 * @component SupplierTable
 * @description Renders a table of suppliers with their details and action buttons.
 * @param {SupplierTableProps} props - The props for the component.
 * @returns {JSX.Element} The supplier table component.
 */
export function SupplierTable({ suppliers, onEdit, onDelete, onView }: SupplierTableProps) {
  /**
   * @function getStatusBadge
   * @description Returns a styled badge based on the supplier's status.
   * @param {Supplier["status"]} status - The status of the supplier.
   * @returns {JSX.Element} A Badge component.
   */
  const getStatusBadge = (status: Supplier["status"]) => {
    return status === "active" ? (
      <Badge className="bg-success text-success-foreground">Actif</Badge>
    ) : (
      <Badge variant="secondary">Inactif</Badge>
    )
  }

  /**
   * @function formatPrice
   * @description Formats a number into a currency string (EUR).
   * @param {number} price - The price to format.
   * @returns {string} The formatted price string.
   */
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price)
  }

  /**
   * @function formatDate
   * @description Formats a date string into a localized date string (fr-FR).
   * @param {string} date - The date string to format.
   * @returns {string} The formatted date string.
   */
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fournisseur</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead className="text-right">Commandes</TableHead>
            <TableHead className="text-right">Total dépensé</TableHead>
            <TableHead>Dernière commande</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{supplier.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {supplier.city}, {supplier.country}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{supplier.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{supplier.phone}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{supplier.category}</TableCell>
              <TableCell className="text-right font-medium">{supplier.totalOrders}</TableCell>
              <TableCell className="text-right font-medium">{formatPrice(supplier.totalSpent)}</TableCell>
              <TableCell>{formatDate(supplier.lastOrder)}</TableCell>
              <TableCell>{getStatusBadge(supplier.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onView(supplier)} title="Voir les détails">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(supplier)} title="Modifier">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(supplier)} title="Supprimer">
                    <Trash2 className="h-4 w-4 text-destructive" />
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
