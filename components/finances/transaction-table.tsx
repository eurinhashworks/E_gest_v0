"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, TrendingUp, TrendingDown } from "lucide-react"
import type { Transaction } from "@/lib/mock-data"

/**
 * @interface TransactionTableProps
 * @description Defines the props for the TransactionTable component.
 * @property {Transaction[]} transactions - An array of transaction objects to display.
 * @property {(transaction: Transaction) => void} onEdit - Callback function for editing a transaction.
 * @property {(transaction: Transaction) => void} onDelete - Callback function for deleting a transaction.
 */
interface TransactionTableProps {
  transactions: Transaction[]
  onEdit: (transaction: Transaction) => void
  onDelete: (transaction: Transaction) => void
}

/**
 * @component TransactionTable
 * @description Renders a table of financial transactions with details and action buttons.
 * @param {TransactionTableProps} props - The props for the component.
 * @returns {JSX.Element} The transaction table component.
 */
export function TransactionTable({ transactions, onEdit, onDelete }: TransactionTableProps) {
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
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Compte</TableHead>
            <TableHead className="text-right">Montant</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{formatDate(transaction.date)}</TableCell>
              <TableCell>
                {transaction.type === "revenue" ? (
                  <Badge className="bg-success/10 text-success border-success" variant="outline">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Revenu
                  </Badge>
                ) : (
                  <Badge className="bg-destructive/10 text-destructive border-destructive" variant="outline">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    Dépense
                  </Badge>
                )}
              </TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{transaction.description}</div>
                  {transaction.reference && (
                    <div className="text-sm text-muted-foreground">Réf: {transaction.reference}</div>
                  )}
                </div>
              </TableCell>
              <TableCell>{transaction.account}</TableCell>
              <TableCell className="text-right">
                <span className={`font-medium ${transaction.type === "revenue" ? "text-success" : "text-destructive"}`}>
                  {transaction.type === "revenue" ? "+" : "-"}
                  {formatPrice(transaction.amount)}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(transaction)} title="Modifier">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(transaction)} title="Supprimer">
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
