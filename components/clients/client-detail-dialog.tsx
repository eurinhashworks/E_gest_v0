"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Client } from "@/lib/mock-data"
import { mockSales, mockClientInteractions } from "@/lib/mock-data"
import { User, Mail, Phone, Building, MapPin, ShoppingCart, DollarSign, Calendar, MessageSquare } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/**
 * @interface ClientDetailDialogProps
 * @description Defines the props for the ClientDetailDialog component.
 * @property {Client | null} client - The client object to display. If null, the dialog will not render.
 * @property {boolean} open - Controls whether the dialog is open or closed.
 * @property {(open: boolean) => void} onOpenChange - Callback function to handle changes in the dialog's open state.
 */
interface ClientDetailDialogProps {
  client: Client | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * @component ClientDetailDialog
 * @description A dialog component that displays detailed information about a client.
 * It includes contact information, address, key metrics, purchase history, and interactions.
 * @param {ClientDetailDialogProps} props - The props for the component.
 * @returns {JSX.Element | null} The dialog component or null if no client is provided.
 */
export function ClientDetailDialog({ client, open, onOpenChange }: ClientDetailDialogProps) {
  if (!client) return null

  const clientSales = mockSales.filter((sale) => sale.client.id === client.id)
  const clientInteractions = mockClientInteractions.filter((interaction) => interaction.clientId === client.id)

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
      month: "long",
      year: "numeric",
    })
  }

  /**
   * @function getSegmentBadge
   * @description Returns a styled badge based on the client's segment.
   * @param {Client["segment"]} segment - The client segment.
   * @returns {JSX.Element} A Badge component.
   */
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Profil client</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">{client.name}</h3>
              {client.company && <p className="text-muted-foreground">{client.company}</p>}
            </div>
            {getSegmentBadge(client.segment)}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Total achats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{client.totalPurchases}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Total dépensé
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPrice(client.totalSpent)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Dernier achat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium">{formatDate(client.lastPurchase)}</div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <User className="h-4 w-4" />
                Informations de contact
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{client.phone}</span>
                </div>
                {client.company && (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{client.company}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Adresse
              </h4>
              <div className="text-sm text-muted-foreground">
                <p>{client.address}</p>
                <p>
                  {client.postalCode} {client.city}
                </p>
                <p>{client.country}</p>
              </div>
            </div>
          </div>

          {client.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Notes
                </h4>
                <p className="text-sm text-muted-foreground">{client.notes}</p>
              </div>
            </>
          )}

          <Separator />

          <Tabs defaultValue="purchases" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="purchases">Historique d'achats ({clientSales.length})</TabsTrigger>
              <TabsTrigger value="interactions">Interactions ({clientInteractions.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="purchases" className="space-y-3 mt-4">
              {clientSales.length > 0 ? (
                clientSales.map((sale) => (
                  <div key={sale.id} className="p-3 border rounded-lg space-y-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{sale.orderNumber}</div>
                        <div className="text-sm text-muted-foreground">{formatDate(sale.createdAt)}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatPrice(sale.total)}</div>
                        <Badge variant="outline" className="text-xs">
                          {sale.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">Aucun achat enregistré</p>
              )}
            </TabsContent>
            <TabsContent value="interactions" className="space-y-3 mt-4">
              {clientInteractions.length > 0 ? (
                clientInteractions.map((interaction) => (
                  <div key={interaction.id} className="p-3 border rounded-lg space-y-1">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {interaction.type}
                          </Badge>
                          <span className="font-medium">{interaction.subject}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{interaction.description}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{formatDate(interaction.date)}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">Aucune interaction enregistrée</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
