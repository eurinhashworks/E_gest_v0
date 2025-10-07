"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Download, Upload, Package } from "lucide-react"
import { SupplierTable } from "@/components/suppliers/supplier-table"
import { SupplierForm } from "@/components/suppliers/supplier-form"
import { SupplyOrderTable } from "@/components/suppliers/supply-order-table"
import { mockSuppliers, mockSupplyOrders, type Supplier, type SupplyOrder } from "@/lib/mock-data"
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
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers)
  const [supplyOrders, setSupplyOrders] = useState<SupplyOrder[]>(mockSupplyOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<SupplyOrder | null>(null)
  const { toast } = useToast()

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || supplier.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreate = () => {
    setSelectedSupplier(null)
    setIsFormOpen(true)
  }

  const handleEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setIsFormOpen(true)
  }

  const handleDelete = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedSupplier) {
      setSuppliers(suppliers.filter((s) => s.id !== selectedSupplier.id))
      toast({
        title: "Fournisseur supprimé",
        description: `${selectedSupplier.name} a été supprimé avec succès.`,
      })
    }
    setIsDeleteDialogOpen(false)
    setSelectedSupplier(null)
  }

  const handleSubmit = (supplierData: Partial<Supplier>) => {
    if (selectedSupplier) {
      setSuppliers(
        suppliers.map((s) =>
          s.id === selectedSupplier.id
            ? { ...s, ...supplierData, updatedAt: new Date().toISOString().split("T")[0] }
            : s,
        ),
      )
      toast({
        title: "Fournisseur mis à jour",
        description: `${supplierData.name} a été mis à jour avec succès.`,
      })
    } else {
      const newSupplier: Supplier = {
        id: String(suppliers.length + 1),
        ...supplierData,
        totalOrders: 0,
        totalSpent: 0,
        lastOrder: new Date().toISOString().split("T")[0],
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      } as Supplier
      setSuppliers([...suppliers, newSupplier])
      toast({
        title: "Fournisseur créé",
        description: `${supplierData.name} a été créé avec succès.`,
      })
    }
    setIsFormOpen(false)
    setSelectedSupplier(null)
  }

  const handleView = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
  }

  const handleViewOrder = (order: SupplyOrder) => {
    setSelectedOrder(order)
  }

  const handleEditOrder = (order: SupplyOrder) => {
    toast({
      title: "Modification de commande",
      description: "La modification des commandes fournisseurs sera disponible prochainement.",
    })
  }

  const handleDeleteOrder = (order: SupplyOrder) => {
    setSupplyOrders(supplyOrders.filter((o) => o.id !== order.id))
    toast({
      title: "Commande supprimée",
      description: `La commande ${order.orderNumber} a été supprimée.`,
    })
  }

  const activeSuppliers = suppliers.filter((s) => s.status === "active").length
  const totalSpent = suppliers.reduce((sum, supplier) => sum + supplier.totalSpent, 0)
  const pendingOrders = supplyOrders.filter((o) => o.status === "pending" || o.status === "confirmed").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fournisseurs</h1>
          <p className="text-muted-foreground">Gérez vos fournisseurs et commandes d'approvisionnement</p>
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
            Nouveau fournisseur
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total fournisseurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fournisseurs actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{activeSuppliers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total dépensé</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }).format(totalSpent)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Commandes en cours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingOrders}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suppliers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="suppliers">Fournisseurs</TabsTrigger>
          <TabsTrigger value="orders">
            <Package className="h-4 w-4 mr-2" />
            Commandes d'approvisionnement
          </TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Liste des fournisseurs</CardTitle>
              <CardDescription>
                {filteredSuppliers.length} fournisseur{filteredSuppliers.length > 1 ? "s" : ""} trouvé
                {filteredSuppliers.length > 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par nom, email, catégorie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous statuts</SelectItem>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <SupplierTable
                suppliers={filteredSuppliers}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commandes d'approvisionnement</CardTitle>
              <CardDescription>{supplyOrders.length} commandes enregistrées</CardDescription>
            </CardHeader>
            <CardContent>
              <SupplyOrderTable
                orders={supplyOrders}
                onEdit={handleEditOrder}
                onDelete={handleDeleteOrder}
                onView={handleViewOrder}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedSupplier ? "Modifier le fournisseur" : "Nouveau fournisseur"}</DialogTitle>
            <DialogDescription>
              {selectedSupplier
                ? "Modifiez les informations du fournisseur ci-dessous"
                : "Remplissez les informations pour créer un nouveau fournisseur"}
            </DialogDescription>
          </DialogHeader>
          <SupplierForm
            supplier={selectedSupplier || undefined}
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
              Êtes-vous sûr de vouloir supprimer le fournisseur "{selectedSupplier?.name}" ? Cette action est
              irréversible.
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
