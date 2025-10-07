"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/lib/mock-data"
import { mockCategories } from "@/lib/mock-data"

interface ProductFormProps {
  product?: Product
  onSubmit: (product: Partial<Product>) => void
  onCancel: () => void
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: "",
      sku: "",
      category: "",
      price: 0,
      cost: 0,
      stock: 0,
      minStock: 0,
      status: "active",
      description: "",
      images: [],
      supplier: "",
    },
  )

  const [variants, setVariants] = useState(product?.variants || [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...formData, variants })
  }

  const handleChange = (field: keyof Product, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du produit *</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input id="sku" value={formData.sku} onChange={(e) => handleChange("sku", e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie *</Label>
                <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier">Fournisseur</Label>
              <Input
                id="supplier"
                value={formData.supplier}
                onChange={(e) => handleChange("supplier", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prix et stock</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Prix de vente (€) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleChange("price", Number.parseFloat(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Prix d'achat (€)</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  value={formData.cost}
                  onChange={(e) => handleChange("cost", Number.parseFloat(e.target.value))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock actuel *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleChange("stock", Number.parseInt(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minStock">Stock minimum</Label>
                <Input
                  id="minStock"
                  type="number"
                  value={formData.minStock}
                  onChange={(e) => handleChange("minStock", Number.parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select value={formData.status} onValueChange={(value: any) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                  <SelectItem value="out_of_stock">Rupture de stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.price && formData.cost && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium">Marge bénéficiaire</div>
                <div className="text-2xl font-bold text-primary">
                  {(
                    (((formData.price as number) - (formData.cost as number)) / (formData.price as number)) *
                    100
                  ).toFixed(1)}
                  %
                </div>
                <div className="text-xs text-muted-foreground">
                  {((formData.price as number) - (formData.cost as number)).toFixed(2)} € par unité
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">{product ? "Mettre à jour" : "Créer le produit"}</Button>
      </div>
    </form>
  )
}
