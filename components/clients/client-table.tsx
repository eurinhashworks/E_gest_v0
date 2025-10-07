"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, Mail, Phone } from "lucide-react"
import type { Client } from "@/lib/mock-data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ClientTableProps {
  clients: Client[]
  onEdit: (client: Client) => void
  onDelete: (client: Client) => void
  onView: (client: Client) => void
}

export function ClientTable({ clients, onEdit, onDelete, onView }: ClientTableProps) {
  const getSegmentBadge = (segment: Client["segment"]) => {
    const segmentConfig = {
      vip: { label: "VIP", className: "bg-primary/10 text-primary border-primary" },
      regular: { label: "Régulier", className: "bg-accent/10 text-accent border-accent" },
      new: { label: "Nouveau", className: "bg-success/10 text-success border-success" },
      inactive: { label: "Inactif", className: "bg-muted text-muted-foreground border-muted-foreground" },
    }
    const config = segmentConfig[segment]
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Segment</TableHead>
            <TableHead className="text-right">Achats</TableHead>
            <TableHead className="text-right">Total dépensé</TableHead>
            <TableHead>Dernier achat</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {getInitials(client.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    {client.company && <div className="text-sm text-muted-foreground">{client.company}</div>}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{client.phone}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{getSegmentBadge(client.segment)}</TableCell>
              <TableCell className="text-right font-medium">{client.totalPurchases}</TableCell>
              <TableCell className="text-right font-medium">{formatPrice(client.totalSpent)}</TableCell>
              <TableCell>{formatDate(client.lastPurchase)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onView(client)} title="Voir les détails">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(client)} title="Modifier">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(client)} title="Supprimer">
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
