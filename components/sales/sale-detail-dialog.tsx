"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Sale } from "@/lib/mock-data"
import { Package, CreditCard, MapPin, FileText, Calendar, User } from "lucide-react"

interface SaleDetailDialogProps {
  sale: Sale | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SaleDetailDialog({ sale, open, onOpenChange }: SaleDetailDialogProps) {
  if (!sale) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Détails de la commande</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">N° Commande</div>
              <div className="text-xl font-mono font-bold">{sale.orderNumber}</div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-sm">
                {sale.status}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {sale.paymentStatus}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Client</div>
                  <div className="text-sm text-muted-foreground">{sale.client.name}</div>
                  <div className="text-sm text-muted-foreground">{sale.client.email}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Adresse de livraison</div>
                  <div className="text-sm text-muted-foreground">{sale.shippingAddress}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Date de commande</div>
                  <div className="text-sm text-muted-foreground">{formatDate(sale.createdAt)}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Méthode de paiement</div>
                  <div className="text-sm text-muted-foreground capitalize">{sale.paymentMethod}</div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">Articles commandés</h3>
            </div>
            <div className="space-y-3">
              {sale.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">{item.productName}</div>
                    <div className="text-sm text-muted-foreground">
                      SKU: {item.sku} • Quantité: {item.quantity}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatPrice(item.total)}</div>
                    <div className="text-sm text-muted-foreground">{formatPrice(item.unitPrice)} / unité</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sous-total</span>
              <span>{formatPrice(sale.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">TVA (20%)</span>
              <span>{formatPrice(sale.tax)}</span>
            </div>
            {sale.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Remise</span>
                <span className="text-destructive">-{formatPrice(sale.discount)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{formatPrice(sale.total)}</span>
            </div>
          </div>

          {sale.notes && (
            <>
              <Separator />
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm font-medium mb-1">Notes</div>
                  <div className="text-sm text-muted-foreground">{sale.notes}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
