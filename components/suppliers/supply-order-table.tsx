"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye } from "lucide-react"
import type { SupplyOrder } from "@/lib/mock-data"

/**
 * @interface SupplyOrderTableProps
 * @description Defines the props for the SupplyOrderTable component.
 * @property {SupplyOrder[]} orders - An array of supply order objects to display.
 * @property {(order: SupplyOrder) => void} onEdit - Callback function for editing an order.
 * @property {(order: SupplyOrder) => void} onDelete - Callback function for deleting an order.
 * @property {(order: SupplyOrder) => void} onView - Callback function for viewing an order's details.
 */
interface SupplyOrderTableProps {
  orders: SupplyOrder[]
  onEdit: (order: SupplyOrder) => void
  onDelete: (order: SupplyOrder) => void
  onView: (order: SupplyOrder) => void
}

/**
 * @component SupplyOrderTable
 * @description Renders a table of supply orders with their details and action buttons.
 * @param {SupplyOrderTableProps} props - The props for the component.
 * @returns {JSX.Element} The supply order table component.
 */
export function SupplyOrderTable({ orders, onEdit, onDelete, onView }: SupplyOrderTableProps) {
  /**
   * @function getStatusBadge
   * @description Returns a styled badge based on the supply order's status.
   * @param {SupplyOrder["status"]} status - The status of the supply order.
   * @returns {JSX.Element} A Badge component representing the order's status.
   */
  const getStatusBadge = (status: SupplyOrder["status"]) => {
    const statusConfig = {
      pending: { label: "En attente", className: "bg-warning/10 text-warning border-warning" },
      confirmed: { label: "Confirmée", className: "bg-primary/10 text-primary border-primary" },
      shipped: { label: "Expédiée", className: "bg-accent/10 text-accent border-accent" },
      received: { label: "Reçue", className: "bg-success/10 text-success border-success" },
      cancelled: { label: "Annulée", className: "bg-destructive/10 text-destructive border-destructive" },
    }
    const config = statusConfig[status]
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  /**
   * @function getPaymentBadge
   * @description Returns a styled badge based on the supply order's payment status.
   * @param {SupplyOrder["paymentStatus"]} status - The payment status of the order.
   * @returns {JSX.Element} A Badge component representing the payment status.
   */
  const getPaymentBadge = (status: SupplyOrder["paymentStatus"]) => {
    const statusConfig = {
      unpaid: { label: "Non payé", className: "bg-destructive/10 text-destructive border-destructive" },
      partial: { label: "Partiel", className: "bg-warning/10 text-warning border-warning" },
      paid: { label: "Payé", className: "bg-success/10 text-success border-success" },
    }
    const config = statusConfig[status]
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
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
            <TableHead>N° Commande</TableHead>
            <TableHead>Fournisseur</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Livraison prévue</TableHead>
            <TableHead className="text-right">Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Paiement</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono font-medium">{order.orderNumber}</TableCell>
              <TableCell>{order.supplier.name}</TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>{formatDate(order.expectedDelivery)}</TableCell>
              <TableCell className="text-right font-medium">{formatPrice(order.total)}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell>{getPaymentBadge(order.paymentStatus)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onView(order)} title="Voir les détails">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(order)} title="Modifier">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(order)} title="Supprimer">
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
