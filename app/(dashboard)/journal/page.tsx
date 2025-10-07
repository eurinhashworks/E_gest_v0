"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, User, Package, ShoppingCart, UsersIcon, Truck, DollarSign } from "lucide-react"
import { useState, useMemo } from "react"

interface JournalEntry {
  id: string
  type: "product" | "sale" | "client" | "supplier" | "transaction"
  action: "create" | "update" | "delete"
  description: string
  user: string
  timestamp: string
}

const mockJournalEntries: JournalEntry[] = [
  {
    id: "1",
    type: "sale",
    action: "create",
    description: "Nouvelle commande CMD-2024-004 créée pour Pierre Durand",
    user: "admin@example.com",
    timestamp: "2024-03-22T14:30:00",
  },
  {
    id: "2",
    type: "product",
    action: "update",
    description: "Stock du produit Smartphone XPro 12 mis à jour (45 unités)",
    user: "admin@example.com",
    timestamp: "2024-03-22T12:15:00",
  },
  {
    id: "3",
    type: "client",
    action: "create",
    description: "Nouveau client Isabelle Moreau ajouté",
    user: "admin@example.com",
    timestamp: "2024-03-22T10:45:00",
  },
  {
    id: "4",
    type: "transaction",
    action: "create",
    description: "Transaction de revenu enregistrée: Vente CMD-2024-003 (83.97 €)",
    user: "admin@example.com",
    timestamp: "2024-03-22T09:20:00",
  },
  {
    id: "5",
    type: "supplier",
    action: "update",
    description: "Informations du fournisseur TechSupply Co. mises à jour",
    user: "admin@example.com",
    timestamp: "2024-03-21T16:00:00",
  },
  {
    id: "6",
    type: "sale",
    action: "update",
    description: "Statut de la commande CMD-2024-002 changé en 'processing'",
    user: "admin@example.com",
    timestamp: "2024-03-21T14:30:00",
  },
  {
    id: "7",
    type: "product",
    action: "create",
    description: "Nouveau produit Ballon de Football Pro ajouté au catalogue",
    user: "admin@example.com",
    timestamp: "2024-03-20T11:00:00",
  },
  {
    id: "8",
    type: "transaction",
    action: "create",
    description: "Dépense enregistrée: Campagne publicitaire Facebook (1200.00 €)",
    user: "admin@example.com",
    timestamp: "2024-03-20T09:15:00",
  },
]

export default function JournalPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [actionFilter, setActionFilter] = useState("all")

  const filteredEntries = useMemo(() => {
    return mockJournalEntries.filter((entry) => {
      const matchesSearch =
        entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.user.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === "all" || entry.type === typeFilter
      const matchesAction = actionFilter === "all" || entry.action === actionFilter
      return matchesSearch && matchesType && matchesAction
    })
  }, [searchTerm, typeFilter, actionFilter])

  const getTypeIcon = (type: JournalEntry["type"]) => {
    switch (type) {
      case "product":
        return <Package className="h-4 w-4" />
      case "sale":
        return <ShoppingCart className="h-4 w-4" />
      case "client":
        return <UsersIcon className="h-4 w-4" />
      case "supplier":
        return <Truck className="h-4 w-4" />
      case "transaction":
        return <DollarSign className="h-4 w-4" />
    }
  }

  const getActionBadge = (action: JournalEntry["action"]) => {
    const config = {
      create: { label: "Création", className: "bg-success/10 text-success border-success" },
      update: { label: "Modification", className: "bg-primary/10 text-primary border-primary" },
      delete: { label: "Suppression", className: "bg-destructive/10 text-destructive border-destructive" },
    }
    const { label, className } = config[action]
    return (
      <Badge variant="outline" className={className}>
        {label}
      </Badge>
    )
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Journal d'activité</h1>
        <p className="text-muted-foreground">Historique complet des actions effectuées dans le système</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
          <CardDescription>Recherchez et filtrez les entrées du journal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans le journal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous types</SelectItem>
                <SelectItem value="product">Produits</SelectItem>
                <SelectItem value="sale">Ventes</SelectItem>
                <SelectItem value="client">Clients</SelectItem>
                <SelectItem value="supplier">Fournisseurs</SelectItem>
                <SelectItem value="transaction">Transactions</SelectItem>
              </SelectContent>
            </Select>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes actions</SelectItem>
                <SelectItem value="create">Création</SelectItem>
                <SelectItem value="update">Modification</SelectItem>
                <SelectItem value="delete">Suppression</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Entrées du journal</CardTitle>
          <CardDescription>
            {filteredEntries.length} entrée{filteredEntries.length > 1 ? "s" : ""} trouvée
            {filteredEntries.length > 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  {getTypeIcon(entry.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {getActionBadge(entry.action)}
                    <Badge variant="outline" className="text-xs capitalize">
                      {entry.type}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{entry.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{entry.user}</span>
                    <span>•</span>
                    <span>{formatTimestamp(entry.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
