"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Download, TrendingUp, TrendingDown, Wallet } from "lucide-react"
import { TransactionTable } from "@/components/finances/transaction-table"
import { TransactionForm } from "@/components/finances/transaction-form"
import { mockTransactions, mockFinancialAccounts, type Transaction } from "@/lib/mock-data"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/**
 * @page FinancesPage
 * @description This page provides a comprehensive interface for managing financial transactions.
 * It includes tabbed views for transactions, accounts, and category analysis.
 * Features include creating, editing, deleting, and filtering transactions.
 *
 * @state {Transaction[]} transactions - The list of all financial transactions.
 * @state {FinancialAccount[]} accounts - The list of all financial accounts.
 * @state {string} searchTerm - The current search term for filtering transactions.
 * @state {string} typeFilter - The current transaction type filter ('all', 'revenue', 'expense').
 * @state {string} categoryFilter - The current transaction category filter.
 * @state {boolean} isFormOpen - Controls the visibility of the transaction creation/edit form dialog.
 * @state {boolean} isDeleteDialogOpen - Controls the visibility of the delete confirmation dialog.
 * @state {Transaction | null} selectedTransaction - The transaction currently selected for an action.
 *
 * @returns {JSX.Element} The finances management page component.
 */
export default function FinancesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [accounts] = useState(mockFinancialAccounts)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const { toast } = useToast()

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter
    return matchesSearch && matchesType && matchesCategory
  })

  /**
   * @description A memoized calculation of key financial statistics like revenue, expenses, net income, and total balance.
   */
  const stats = useMemo(() => {
    const totalRevenue = transactions.filter((t) => t.type === "revenue").reduce((sum, t) => sum + t.amount, 0)
    const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
    const netIncome = totalRevenue - totalExpenses
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

    return { totalRevenue, totalExpenses, netIncome, totalBalance }
  }, [transactions, accounts])

  /**
   * @description A memoized calculation that groups transactions by category and sums up revenue and expenses for each.
   */
  const categories = useMemo(() => {
    const categoryMap = new Map<string, { revenue: number; expense: number }>()
    transactions.forEach((t) => {
      const current = categoryMap.get(t.category) || { revenue: 0, expense: 0 }
      if (t.type === "revenue") {
        current.revenue += t.amount
      } else {
        current.expense += t.amount
      }
      categoryMap.set(t.category, current)
    })
    return Array.from(categoryMap.entries()).map(([name, amounts]) => ({
      name,
      ...amounts,
      total: amounts.revenue - amounts.expense,
    }))
  }, [transactions])

  /** @function handleCreate - Opens the form dialog to create a new transaction. */
  const handleCreate = () => {
    setSelectedTransaction(null)
    setIsFormOpen(true)
  }

  /** @function handleEdit - Opens the form dialog to edit an existing transaction. */
  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsFormOpen(true)
  }

  /** @function handleDelete - Opens the delete confirmation dialog for a transaction. */
  const handleDelete = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsDeleteDialogOpen(true)
  }

  /** @function confirmDelete - Deletes the selected transaction from the state and shows a toast notification. */
  const confirmDelete = () => {
    if (selectedTransaction) {
      setTransactions(transactions.filter((t) => t.id !== selectedTransaction.id))
      toast({
        title: "Transaction supprimée",
        description: "La transaction a été supprimée avec succès.",
      })
    }
    setIsDeleteDialogOpen(false)
    setSelectedTransaction(null)
  }

  /** @function handleSubmit - Handles the submission of the transaction form for both creation and updates. */
  const handleSubmit = (transactionData: Partial<Transaction>) => {
    if (selectedTransaction) {
      setTransactions(
        transactions.map((t) =>
          t.id === selectedTransaction.id
            ? { ...t, ...transactionData, createdAt: new Date().toISOString().split("T")[0] }
            : t,
        ),
      )
      toast({
        title: "Transaction mise à jour",
        description: "La transaction a été mise à jour avec succès.",
      })
    } else {
      const newTransaction: Transaction = {
        id: String(transactions.length + 1),
        ...transactionData,
        createdAt: new Date().toISOString().split("T")[0],
        createdBy: "admin@example.com",
      } as Transaction
      setTransactions([...transactions, newTransaction])
      toast({
        title: "Transaction créée",
        description: "La transaction a été créée avec succès.",
      })
    }
    setIsFormOpen(false)
    setSelectedTransaction(null)
  }

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finances</h1>
          <p className="text-muted-foreground">Gérez vos revenus, dépenses et comptes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle transaction
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Revenus totaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{formatPrice(stats.totalRevenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              Dépenses totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{formatPrice(stats.totalExpenses)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Résultat net</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.netIncome >= 0 ? "text-success" : "text-destructive"}`}>
              {formatPrice(stats.netIncome)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Solde total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(stats.totalBalance)}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="accounts">Comptes</TabsTrigger>
          <TabsTrigger value="categories">Par catégorie</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Liste des transactions</CardTitle>
              <CardDescription>
                {filteredTransactions.length} transaction{filteredTransactions.length > 1 ? "s" : ""} trouvée
                {filteredTransactions.length > 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par description, catégorie, référence..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous types</SelectItem>
                    <SelectItem value="revenue">Revenus</SelectItem>
                    <SelectItem value="expense">Dépenses</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes catégories</SelectItem>
                    {Array.from(new Set(transactions.map((t) => t.category))).map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <TransactionTable transactions={filteredTransactions} onEdit={handleEdit} onDelete={handleDelete} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {accounts.map((account) => (
              <Card key={account.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{account.name}</span>
                    <Wallet className="h-5 w-5 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription className="capitalize">{account.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${account.balance >= 0 ? "text-success" : "text-destructive"}`}>
                    {formatPrice(account.balance)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{account.currency}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyse par catégorie</CardTitle>
              <CardDescription>Revenus et dépenses par catégorie</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.name} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{category.name}</h3>
                      <span className={`font-bold ${category.total >= 0 ? "text-success" : "text-destructive"}`}>
                        {formatPrice(category.total)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Revenus</div>
                        <div className="font-medium text-success">{formatPrice(category.revenue)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Dépenses</div>
                        <div className="font-medium text-destructive">{formatPrice(category.expense)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTransaction ? "Modifier la transaction" : "Nouvelle transaction"}</DialogTitle>
            <DialogDescription>
              {selectedTransaction
                ? "Modifiez les informations de la transaction ci-dessous"
                : "Remplissez les informations pour créer une nouvelle transaction"}
            </DialogDescription>
          </DialogHeader>
          <TransactionForm
            transaction={selectedTransaction || undefined}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette transaction ? Cette action est irréversible.
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
