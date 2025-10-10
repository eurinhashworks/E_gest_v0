"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, FileText } from "lucide-react"
import type { Sale } from "@/lib/mock-data"

/**
 * @interface SalesTableProps
 * @description Defines the props for the SalesTable component.
 * @property {Sale[]} sales - An array of sale objects to display.
 * @property {(sale: Sale) => void} onEdit - Callback function for editing a sale.
 * @property {(sale: Sale) => void} onDelete - Callback function for deleting a sale.
 * @property {(sale: Sale) => void} onView - Callback function for viewing a sale's details.
 * @property {(sale: Sale) => void} onGenerateInvoice - Callback function for generating an invoice for a sale.
 */
interface SalesTableProps {
  sales: Sale[]
  onEdit: (sale: Sale) => void
  onDelete: (sale: Sale) => void
  onView: (sale: Sale) => void
  onGenerateInvoice: (sale: Sale) => void
}

/**
 * @component SalesTable
 * @description Renders a table of sales with their details and action buttons.
 * @param {SalesTableProps} props - The props for the component.
 * @returns {JSX.Element} The sales table component.
 */
export function SalesTable({ sales, onEdit, onDelete, onView, onGenerateInvoice }: SalesTableProps) {
  /**
   * @function getStatusBadge
   * @description Returns a styled badge based on the sale's status.
   * @param {Sale["status"]} status - The status of the sale.
   * @returns {JSX.Element} A Badge component representing the sale's status.
   */
  const getStatusBadge = (status: Sale["status"]) => {
    const statusConfig = {
      pending: { label: "En attente", className: "bg-warning/10 text-warning border-warning" },
      confirmed: { label: "Confirmée", className: "bg-primary/10 text-primary border-primary" },
      processing: { label: "En traitement", className: "bg-accent/10 text-accent border-accent" },
      shipped: { label: "Expédiée", className: "bg-chart-2/10 text-chart-2 border-chart-2" },
      delivered: { label: "Livrée", className: "bg-success/10 text-success border-success" },
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
   * @description Returns a styled badge based on the sale's payment status.
   * @param {Sale["paymentStatus"]} status - The payment status of the sale.
   * @returns {JSX.Element} A Badge component representing the payment status.
   */
  const getPaymentBadge = (status: Sale["paymentStatus"]) => {
    const statusConfig = {
      unpaid: { label: "Non payé", className: "bg-destructive/10 text-destructive border-destructive" },
      partial: { label: "Partiel", className: "bg-warning/10 text-warning border-warning" },
      paid: { label: "Payé", className: "bg-success/10 text-success border-success" },
      refunded: { label: "Remboursé", className: "bg-muted text-muted-foreground border-muted-foreground" },
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
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Paiement</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell className="font-mono font-medium">{sale.orderNumber}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{sale.client.name}</div>
                  <div className="text-sm text-muted-foreground">{sale.client.email}</div>
                </div>
              </TableCell>
              <TableCell>{formatDate(sale.createdAt)}</TableCell>
              <TableCell className="text-right font-medium">{formatPrice(sale.total)}</TableCell>
              <TableCell>{getStatusBadge(sale.status)}</TableCell>
              <TableCell>{getPaymentBadge(sale.paymentStatus)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onView(sale)} title="Voir les détails">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onGenerateInvoice(sale)} title="Générer facture">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(sale)} title="Modifier">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(sale)} title="Supprimer">
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
