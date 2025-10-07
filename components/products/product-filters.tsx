"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"
import { mockCategories } from "@/lib/mock-data"

interface ProductFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  categoryFilter: string
  onCategoryChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  onReset: () => void
}

export function ProductFilters({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  onReset,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par nom, SKU..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={categoryFilter} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes catégories</SelectItem>
          {mockCategories.map((cat) => (
            <SelectItem key={cat.id} value={cat.name}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous statuts</SelectItem>
          <SelectItem value="active">Actif</SelectItem>
          <SelectItem value="inactive">Inactif</SelectItem>
          <SelectItem value="low_stock">Stock faible</SelectItem>
          <SelectItem value="out_of_stock">Rupture</SelectItem>
        </SelectContent>
      </Select>
      {(searchTerm || categoryFilter !== "all" || statusFilter !== "all") && (
        <Button variant="outline" onClick={onReset}>
          <X className="h-4 w-4 mr-2" />
          Réinitialiser
        </Button>
      )}
    </div>
  )
}
