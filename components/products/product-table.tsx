"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, AlertTriangle } from "lucide-react"
import type { Product } from "@/lib/mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

/**
 * @interface ProductTableProps
 * @description Defines the props for the ProductTable component.
 * @property {Product[]} products - An array of product objects to display.
 * @property {(product: Product) => void} onEdit - Callback function for editing a product.
 * @property {(product: Product) => void} onDelete - Callback function for deleting a product.
 * @property {(product: Product) => void} onView - Callback function for viewing a product's details.
 */
interface ProductTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
  onView: (product: Product) => void
}

/**
 * @component ProductTable
 * @description Renders a table of products with their details and action buttons.
 * @param {ProductTableProps} props - The props for the component.
 * @returns {JSX.Element} The product table component.
 */
export function ProductTable({ products, onEdit, onDelete, onView }: ProductTableProps) {
  /**
   * @function getStatusBadge
   * @description Determines and returns a styled badge based on the product's stock status.
   * @param {Product["status"]} status - The status of the product.
   * @param {number} stock - The current stock level.
   * @param {number} minStock - The minimum stock level.
   * @returns {JSX.Element} A Badge component representing the product's status.
   */
  const getStatusBadge = (status: Product["status"], stock: number, minStock: number) => {
    if (status === "out_of_stock" || stock === 0) {
      return <Badge variant="destructive">Rupture</Badge>
    }
    if (stock <= minStock) {
      return (
        <Badge variant="outline" className="border-warning text-warning">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Stock faible
        </Badge>
      )
    }
    if (status === "active") {
      return <Badge className="bg-success text-success-foreground">Actif</Badge>
    }
    return <Badge variant="secondary">Inactif</Badge>
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

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produit</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead className="text-right">Prix</TableHead>
            <TableHead className="text-right">Stock</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-md">
                    <AvatarImage src={product.images[0] || "/placeholder.svg"} alt={product.name} />
                    <AvatarFallback>{product.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.supplier}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm">{product.sku}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-right font-medium">{formatPrice(product.price)}</TableCell>
              <TableCell className="text-right">
                <div className="font-medium">{product.stock}</div>
                <div className="text-xs text-muted-foreground">Min: {product.minStock}</div>
              </TableCell>
              <TableCell>{getStatusBadge(product.status, product.stock, product.minStock)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onView(product)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(product)}>
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
