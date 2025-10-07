"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Transaction } from "@/lib/mock-data"
import { mockFinancialAccounts } from "@/lib/mock-data"

interface TransactionFormProps {
  transaction?: Transaction
  onSubmit: (transaction: Partial<Transaction>) => void
  onCancel: () => void
}

const revenueCategories = ["Ventes", "Services", "Intérêts", "Autres revenus"]
const expenseCategories = [
  "Achats fournisseurs",
  "Salaires",
  "Loyer",
  "Utilities",
  "Marketing",
  "Transport",
  "Assurances",
  "Taxes",
  "Autres dépenses",
]

export function TransactionForm({ transaction, onSubmit, onCancel }: TransactionFormProps) {
  const [formData, setFormData] = useState<Partial<Transaction>>(
    transaction || {
      type: "expense",
      category: "",
      amount: 0,
      account: "",
      description: "",
      reference: "",
      date: new Date().toISOString().split("T")[0],
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof Transaction, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const categories = formData.type === "revenue" ? revenueCategories : expenseCategories

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations de la transaction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select value={formData.type} onValueChange={(value: any) => handleChange("type", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenu</SelectItem>
                  <SelectItem value="expense">Dépense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie *</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="account">Compte *</Label>
              <Select value={formData.account} onValueChange={(value) => handleChange("account", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un compte" />
                </SelectTrigger>
                <SelectContent>
                  {mockFinancialAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.name}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Montant (€) *</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => handleChange("amount", Number.parseFloat(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">Référence</Label>
            <Input
              id="reference"
              value={formData.reference}
              onChange={(e) => handleChange("reference", e.target.value)}
              placeholder="N° de facture, commande, etc."
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">{transaction ? "Mettre à jour" : "Créer la transaction"}</Button>
      </div>
    </form>
  )
}
