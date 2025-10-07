"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Client } from "@/lib/mock-data"

interface ClientFormProps {
  client?: Client
  onSubmit: (client: Partial<Client>) => void
  onCancel: () => void
}

export function ClientForm({ client, onSubmit, onCancel }: ClientFormProps) {
  const [formData, setFormData] = useState<Partial<Client>>(
    client || {
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      city: "",
      postalCode: "",
      country: "France",
      segment: "new",
      notes: "",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof Client, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet *</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Entreprise</Label>
              <Input id="company" value={formData.company} onChange={(e) => handleChange("company", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="segment">Segment</Label>
              <Select value={formData.segment} onValueChange={(value: any) => handleChange("segment", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="regular">Régulier</SelectItem>
                  <SelectItem value="new">Nouveau</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Adresse</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Adresse *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ville *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Code postal *</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleChange("postalCode", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Pays *</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                rows={4}
                placeholder="Informations supplémentaires sur le client..."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">{client ? "Mettre à jour" : "Créer le client"}</Button>
      </div>
    </form>
  )
}
