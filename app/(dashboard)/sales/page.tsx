"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Download } from "lucide-react"
import { SalesTable } from "@/components/sales/sales-table"
import { SaleForm } from "@/components/sales/sale-form"
import { SaleDetailDialog } from "@/components/sales/sale-detail-dialog"
import { mockSales, type Sale } from "@/lib/mock-data"
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

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>(mockSales)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null)
  const { toast } = useToast()

  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      sale.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || sale.status === statusFilter
    const matchesPayment = paymentFilter === "all" || sale.paymentStatus === paymentFilter
    return matchesSearch && matchesStatus && matchesPayment
  })

  const handleCreate = () => {
    setSelectedSale(null)
    setIsFormOpen(true)
  }

  const handleEdit = (sale: Sale) => {
    setSelectedSale(sale)
    setIsFormOpen(true)
  }

  const handleDelete = (sale: Sale) => {
    setSelectedSale(sale)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedSale) {
      setSales(sales.filter((s) => s.id !== selectedSale.id))
      toast({
        title: "Commande supprimée",
        description: `La commande ${selectedSale.orderNumber} a été supprimée avec succès.`,
      })
    }
    setIsDeleteDialogOpen(false)
    setSelectedSale(null)
  }

  const handleSubmit = (saleData: Partial<Sale>) => {
    if (selectedSale) {
      setSales(
        sales.map((s) =>
          s.id === selectedSale.id ? { ...s, ...saleData, updatedAt: new Date().toISOString().split("T")[0] } : s,
        ),
      )
      toast({
        title: "Commande mise à jour",
        description: `La commande ${saleData.orderNumber} a été mise à jour avec succès.`,
      })
    } else {
      const newSale: Sale = {
        id: String(sales.length + 1),
        ...saleData,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        createdBy: "admin@example.com",
      } as Sale
      setSales([...sales, newSale])
      toast({
        title: "Commande créée",
        description: `La commande ${saleData.orderNumber} a été créée avec succès.`,
      })
    }
    setIsFormOpen(false)
    setSelectedSale(null)
  }

  const handleView = (sale: Sale) => {
    setSelectedSale(sale)
    setIsDetailOpen(true)
  }

  const handleGenerateInvoice = (sale: Sale) => {
    toast({
      title: "Facture générée",
      description: `La facture pour la commande ${sale.orderNumber} a été générée.`,
    })
  }

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0)
  const paidOrders = sales.filter((s) => s.paymentStatus === "paid").length
  const pendingOrders = sales.filter((s) => s.status === "pending").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ventes</h1>
          <p className="text-muted-foreground">Gérez vos commandes et factures</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle commande
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenus totaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(totalRevenue)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Commandes payées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{paidOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingOrders}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des commandes</CardTitle>
          <CardDescription>
            {filteredSales.length} commande{filteredSales.length > 1 ? "s" : ""} trouvée
            {filteredSales.length > 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par n° commande, client..."
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
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="confirmed">Confirmée</SelectItem>
                <SelectItem value="processing">En traitement</SelectItem>
                <SelectItem value="shipped">Expédiée</SelectItem>
                <SelectItem value="delivered">Livrée</SelectItem>
                <SelectItem value="cancelled">Annulée</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Paiement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous paiements</SelectItem>
                <SelectItem value="unpaid">Non payé</SelectItem>
                <SelectItem value="partial">Partiel</SelectItem>
                <SelectItem value="paid">Payé</SelectItem>
                <SelectItem value="refunded">Remboursé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <SalesTable
            sales={filteredSales}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            onGenerateInvoice={handleGenerateInvoice}
          />
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedSale ? "Modifier la commande" : "Nouvelle commande"}</DialogTitle>
            <DialogDescription>
              {selectedSale
                ? "Modifiez les informations de la commande ci-dessous"
                : "Remplissez les informations pour créer une nouvelle commande"}
            </DialogDescription>
          </DialogHeader>
          <SaleForm sale={selectedSale || undefined} onSubmit={handleSubmit} onCancel={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>

      <SaleDetailDialog sale={selectedSale} open={isDetailOpen} onOpenChange={setIsDetailOpen} />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer la commande "{selectedSale?.orderNumber}" ? Cette action est
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
