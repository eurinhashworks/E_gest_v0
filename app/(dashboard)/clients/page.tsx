"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Download, Upload } from "lucide-react"
import { ClientTable } from "@/components/clients/client-table"
import { ClientForm } from "@/components/clients/client-form"
import { ClientDetailDialog } from "@/components/clients/client-detail-dialog"
import { mockClients, type Client } from "@/lib/mock-data"
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

/**
 * @page ClientsPage
 * @description This page provides a comprehensive interface for managing clients.
 * It includes functionality for viewing, creating, editing, and deleting clients,
 * as well as filtering the client list and displaying key performance indicators (KPIs).
 *
 * @state {Client[]} clients - The list of all clients.
 * @state {string} searchTerm - The current search term for filtering clients.
 * @state {string} segmentFilter - The current segment filter for clients.
 * @state {boolean} isFormOpen - Controls the visibility of the client creation/edit form dialog.
 * @state {boolean} isDetailOpen - Controls the visibility of the client detail view dialog.
 * @state {boolean} isDeleteDialogOpen - Controls the visibility of the delete confirmation dialog.
 * @state {Client | null} selectedClient - The client currently selected for an action (edit, view, delete).
 *
 * @returns {JSX.Element} The clients management page component.
 */
export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [segmentFilter, setSegmentFilter] = useState("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const { toast } = useToast()

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSegment = segmentFilter === "all" || client.segment === segmentFilter
    return matchesSearch && matchesSegment
  })

  /** @function handleCreate - Opens the form dialog to create a new client. */
  const handleCreate = () => {
    setSelectedClient(null)
    setIsFormOpen(true)
  }

  /** @function handleEdit - Opens the form dialog to edit an existing client. */
  const handleEdit = (client: Client) => {
    setSelectedClient(client)
    setIsFormOpen(true)
  }

  /** @function handleDelete - Opens the delete confirmation dialog for a client. */
  const handleDelete = (client: Client) => {
    setSelectedClient(client)
    setIsDeleteDialogOpen(true)
  }

  /** @function confirmDelete - Deletes the selected client from the state and shows a toast notification. */
  const confirmDelete = () => {
    if (selectedClient) {
      setClients(clients.filter((c) => c.id !== selectedClient.id))
      toast({
        title: "Client supprimé",
        description: `${selectedClient.name} a été supprimé avec succès.`,
      })
    }
    setIsDeleteDialogOpen(false)
    setSelectedClient(null)
  }

  /** @function handleSubmit - Handles the submission of the client form for both creation and updates. */
  const handleSubmit = (clientData: Partial<Client>) => {
    if (selectedClient) {
      setClients(
        clients.map((c) =>
          c.id === selectedClient.id ? { ...c, ...clientData, updatedAt: new Date().toISOString().split("T")[0] } : c,
        ),
      )
      toast({
        title: "Client mis à jour",
        description: `${clientData.name} a été mis à jour avec succès.`,
      })
    } else {
      const newClient: Client = {
        id: String(clients.length + 1),
        ...clientData,
        totalPurchases: 0,
        totalSpent: 0,
        lastPurchase: new Date().toISOString().split("T")[0],
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      } as Client
      setClients([...clients, newClient])
      toast({
        title: "Client créé",
        description: `${clientData.name} a été créé avec succès.`,
      })
    }
    setIsFormOpen(false)
    setSelectedClient(null)
  }

  /** @function handleView - Opens the detail dialog to view a client's information. */
  const handleView = (client: Client) => {
    setSelectedClient(client)
    setIsDetailOpen(true)
  }

  const vipCount = clients.filter((c) => c.segment === "vip").length
  const totalRevenue = clients.reduce((sum, client) => sum + client.totalSpent, 0)
  const avgSpent = totalRevenue / clients.length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">Gérez vos clients et leur historique</p>
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
            Nouveau client
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clients VIP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{vipCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenu total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }).format(totalRevenue)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Panier moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(avgSpent)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des clients</CardTitle>
          <CardDescription>
            {filteredClients.length} client{filteredClients.length > 1 ? "s" : ""} trouvé
            {filteredClients.length > 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, email, entreprise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={segmentFilter} onValueChange={setSegmentFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous segments</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="regular">Régulier</SelectItem>
                <SelectItem value="new">Nouveau</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ClientTable clients={filteredClients} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedClient ? "Modifier le client" : "Nouveau client"}</DialogTitle>
            <DialogDescription>
              {selectedClient
                ? "Modifiez les informations du client ci-dessous"
                : "Remplissez les informations pour créer un nouveau client"}
            </DialogDescription>
          </DialogHeader>
          <ClientForm
            client={selectedClient || undefined}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <ClientDetailDialog client={selectedClient} open={isDetailOpen} onOpenChange={setIsDetailOpen} />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le client "{selectedClient?.name}" ? Cette action est irréversible et
              supprimera également l'historique d'achats associé.
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
