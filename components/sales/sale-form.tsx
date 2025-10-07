"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Sale, SaleItem } from "@/lib/mock-data"
import { mockProducts } from "@/lib/mock-data"
import { Plus, Trash2 } from "lucide-react"

interface SaleFormProps {
  sale?: Sale
  onSubmit: (sale: Partial<Sale>) => void
  onCancel: () => void
}

export function SaleForm({ sale, onSubmit, onCancel }: SaleFormProps) {
  const [formData, setFormData] = useState<Partial<Sale>>(
    sale || {
      orderNumber: `CMD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
      client: { id: "", name: "", email: "" },
      items: [],
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
      status: "pending",
      paymentStatus: "unpaid",
      paymentMethod: "card",
      shippingAddress: "",
      notes: "",
    },
  )

  const [items, setItems] = useState<SaleItem[]>(sale?.items || [])

  const addItem = () => {
    const newItem: SaleItem = {
      id: String(items.length + 1),
      productId: "",
      productName: "",
      sku: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    }
    setItems([...items, newItem])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof SaleItem, value: any) => {
    const updatedItems = [...items]
    updatedItems[index] = { ...updatedItems[index], [field]: value }

    if (field === "productId") {
      const product = mockProducts.find((p) => p.id === value)
      if (product) {
        updatedItems[index].productName = product.name
        updatedItems[index].sku = product.sku
        updatedItems[index].unitPrice = product.price
      }
    }

    if (field === "quantity" || field === "unitPrice") {
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unitPrice
    }

    setItems(updatedItems)
  }

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0)
    const tax = subtotal * 0.2 // 20% TVA
    const discount = formData.discount || 0
    const total = subtotal + tax - discount
    return { subtotal, tax, total }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { subtotal, tax, total } = calculateTotals()
    onSubmit({
      ...formData,
      items,
      subtotal,
      tax,
      total,
    })
  }

  const { subtotal, tax, total } = calculateTotals()

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations commande</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orderNumber">N° Commande</Label>
              <Input
                id="orderNumber"
                value={formData.orderNumber}
                onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientName">Nom du client *</Label>
              <Input
                id="clientName"
                value={formData.client?.name}
                onChange={(e) => setFormData({ ...formData, client: { ...formData.client!, name: e.target.value } })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientEmail">Email du client</Label>
              <Input
                id="clientEmail"
                type="email"
                value={formData.client?.email}
                onChange={(e) => setFormData({ ...formData, client: { ...formData.client!, email: e.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shippingAddress">Adresse de livraison</Label>
              <Textarea
                id="shippingAddress"
                value={formData.shippingAddress}
                onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statut et paiement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Statut de la commande</Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="confirmed">Confirmée</SelectItem>
                  <SelectItem value="processing">En traitement</SelectItem>
                  <SelectItem value="shipped">Expédiée</SelectItem>
                  <SelectItem value="delivered">Livrée</SelectItem>
                  <SelectItem value="cancelled">Annulée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentStatus">Statut du paiement</Label>
              <Select
                value={formData.paymentStatus}
                onValueChange={(value: any) => setFormData({ ...formData, paymentStatus: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unpaid">Non payé</SelectItem>
                  <SelectItem value="partial">Partiel</SelectItem>
                  <SelectItem value="paid">Payé</SelectItem>
                  <SelectItem value="refunded">Remboursé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Méthode de paiement</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value: any) => setFormData({ ...formData, paymentMethod: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Espèces</SelectItem>
                  <SelectItem value="card">Carte bancaire</SelectItem>
                  <SelectItem value="transfer">Virement</SelectItem>
                  <SelectItem value="check">Chèque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Articles</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un article
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead className="text-right">Prix unitaire</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Select value={item.productId} onValueChange={(value) => updateItem(index, "productId", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un produit" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProducts.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} ({product.sku})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value))}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell className="text-right">{item.unitPrice.toFixed(2)} €</TableCell>
                  <TableCell className="text-right font-medium">{item.total.toFixed(2)} €</TableCell>
                  <TableCell>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 space-y-2 max-w-sm ml-auto">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sous-total</span>
              <span className="font-medium">{subtotal.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">TVA (20%)</span>
              <span className="font-medium">{tax.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Remise</span>
              <Input
                type="number"
                step="0.01"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: Number.parseFloat(e.target.value) || 0 })}
                className="w-24 h-8 text-right"
              />
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">{sale ? "Mettre à jour" : "Créer la commande"}</Button>
      </div>
    </form>
  )
}
