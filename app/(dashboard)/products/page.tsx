"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Download, Upload } from "lucide-react"
import { ProductTable } from "@/components/products/product-table"
import { ProductForm } from "@/components/products/product-form"
import { ProductFilters } from "@/components/products/product-filters"
import { mockProducts, type Product } from "@/lib/mock-data"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

/**
 * @page ProductsPage
 * @description This page provides a comprehensive interface for managing products.
 * It includes functionality for viewing, creating, editing, and deleting products,
 * as well as filtering the product list and displaying key inventory metrics.
 *
 * @state {Product[]} products - The list of all products.
 * @state {string} searchTerm - The current search term for filtering products.
 * @state {string} categoryFilter - The current category filter for products.
 * @state {string} statusFilter - The current status filter for products.
 * @state {boolean} isFormOpen - Controls the visibility of the product creation/edit form dialog.
 * @state {boolean} isDeleteDialogOpen - Controls the visibility of the delete confirmation dialog.
 * @state {Product | null} selectedProduct - The product currently selected for an action (edit, view, delete).
 *
 * @returns {JSX.Element} The products management page component.
 */
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { toast } = useToast()

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "low_stock" && product.stock <= product.minStock && product.stock > 0) ||
      product.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  /** @function handleCreate - Opens the form dialog to create a new product. */
  const handleCreate = () => {
    setSelectedProduct(null)
    setIsFormOpen(true)
  }

  /** @function handleEdit - Opens the form dialog to edit an existing product. */
  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsFormOpen(true)
  }

  /** @function handleDelete - Opens the delete confirmation dialog for a product. */
  const handleDelete = (product: Product) => {
    setSelectedProduct(product)
    setIsDeleteDialogOpen(true)
  }

  /** @function confirmDelete - Deletes the selected product from the state and shows a toast notification. */
  const confirmDelete = () => {
    if (selectedProduct) {
      setProducts(products.filter((p) => p.id !== selectedProduct.id))
      toast({
        title: "Produit supprimé",
        description: `${selectedProduct.name} a été supprimé avec succès.`,
      })
    }
    setIsDeleteDialogOpen(false)
    setSelectedProduct(null)
  }

  /** @function handleSubmit - Handles the submission of the product form for both creation and updates. */
  const handleSubmit = (productData: Partial<Product>) => {
    if (selectedProduct) {
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...productData, updatedAt: new Date().toISOString().split("T")[0] } : p,
        ),
      )
      toast({
        title: "Produit mis à jour",
        description: `${productData.name} a été mis à jour avec succès.`,
      })
    } else {
      const newProduct: Product = {
        id: String(products.length + 1),
        ...productData,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        createdBy: "admin@example.com",
      } as Product
      setProducts([...products, newProduct])
      toast({
        title: "Produit créé",
        description: `${productData.name} a été créé avec succès.`,
      })
    }
    setIsFormOpen(false)
    setSelectedProduct(null)
  }

  /** @function handleView - Placeholder for viewing product details. Currently selects the product. */
  const handleView = (product: Product) => {
    setSelectedProduct(product)
    // Could open a detailed view dialog
  }

  /** @function handleReset - Resets all active filters to their default states. */
  const handleReset = () => {
    setSearchTerm("")
    setCategoryFilter("all")
    setStatusFilter("all")
  }

  const lowStockCount = products.filter((p) => p.stock <= p.minStock && p.stock > 0).length
  const outOfStockCount = products.filter((p) => p.stock === 0).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produits</h1>
          <p className="text-muted-foreground">Gérez votre catalogue de produits</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Importer
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau produit
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total produits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Stock faible</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{lowStockCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rupture de stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{outOfStockCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des produits</CardTitle>
          <CardDescription>
            {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé
            {filteredProducts.length > 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProductFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            onReset={handleReset}
          />
          <ProductTable products={filteredProducts} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProduct ? "Modifier le produit" : "Nouveau produit"}</DialogTitle>
            <DialogDescription>
              {selectedProduct
                ? "Modifiez les informations du produit ci-dessous"
                : "Remplissez les informations pour créer un nouveau produit"}
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            product={selectedProduct || undefined}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le produit "{selectedProduct?.name}" ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
