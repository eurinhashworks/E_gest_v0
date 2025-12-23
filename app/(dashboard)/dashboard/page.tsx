"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown, AlertTriangle, Truck } from "lucide-react"
import { mockProducts, mockSales, mockClients, mockTransactions, mockSupplyOrders } from "@/lib/mock-data"
import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

/**
 * @page DashboardPage
 * @description The main dashboard page of the application, providing an overview of key business metrics.
 * It uses `useMemo` hooks to calculate various statistics from mock data, such as financial summaries,
 * sales data, product inventory status, and client information.
 * @returns {JSX.Element} The dashboard page component.
 */
export default function DashboardPage() {
  /**
   * @description A memoized calculation of various key performance indicators (KPIs) across the application.
   * This includes financial, sales, product, client, and supply order statistics.
   */
  const stats = useMemo(() => {
    // Financial stats
    const totalRevenue = mockTransactions.filter((t) => t.type === "revenue").reduce((sum, t) => sum + t.amount, 0)
    const totalExpenses = mockTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
    const netIncome = totalRevenue - totalExpenses

    // Sales stats
    const totalOrders = mockSales.length
    const paidOrders = mockSales.filter((s) => s.paymentStatus === "paid").length
    const pendingOrders = mockSales.filter((s) => s.status === "pending").length

    // Product stats
    const totalProducts = mockProducts.length
    const lowStockProducts = mockProducts.filter((p) => p.stock <= p.minStock && p.stock > 0).length
    const outOfStockProducts = mockProducts.filter((p) => p.stock === 0).length

    // Client stats
    const totalClients = mockClients.length
    const vipClients = mockClients.filter((c) => c.segment === "vip").length
    const newClients = mockClients.filter((c) => c.segment === "new").length

    // Supply orders
    const pendingSupplyOrders = mockSupplyOrders.filter(
      (o) => o.status === "pending" || o.status === "confirmed",
    ).length

    return {
      totalRevenue,
      totalExpenses,
      netIncome,
      totalOrders,
      paidOrders,
      pendingOrders,
      totalProducts,
      lowStockProducts,
      outOfStockProducts,
      totalClients,
      vipClients,
      newClients,
      pendingSupplyOrders,
    }
  }, [])

  /**
   * @description A memoized calculation to determine the top 5 best-selling products based on revenue.
   */
  const topProducts = useMemo(() => {
    const productSales = new Map<string, { name: string; quantity: number; revenue: number }>()

    mockSales.forEach((sale) => {
      sale.items.forEach((item) => {
        const current = productSales.get(item.productId) || { name: item.productName, quantity: 0, revenue: 0 }
        current.quantity += item.quantity
        current.revenue += item.total
        productSales.set(item.productId, current)
      })
    })

    return Array.from(productSales.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
  }, [])

  /**
   * @description A memoized calculation to determine the top 5 clients based on total spending.
   */
  const topClients = useMemo(() => {
    return [...mockClients].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5)
  }, [])

  /**
   * @description A memoized calculation to get the 5 most recent sales orders.
   */
  const recentOrders = useMemo(() => {
    return [...mockSales].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)
  }, [])

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
   * @description Formats a date string into a short, localized date string (fr-FR).
   * @param {string} date - The date string to format.
   * @returns {string} The formatted date string.
   */
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
    })
  }

  /**
   * @function getInitials
   * @description Extracts the initials from a full name for use in an avatar fallback.
   * @param {string} name - The full name.
   * @returns {string} The initials (up to 2 characters).
   */
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d'ensemble de votre activité e-commerce</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenus du mois</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</div>
            <div className="flex items-center gap-1 text-xs mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-success">+12.5%</span>
              <span className="text-muted-foreground">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <div className="flex items-center gap-1 text-xs mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-success">+8.2%</span>
              <span className="text-muted-foreground">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clients actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <div className="flex items-center gap-1 text-xs mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-success">+5.4%</span>
              <span className="text-muted-foreground">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Résultat net</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.netIncome >= 0 ? "text-success" : "text-destructive"}`}>
              {formatPrice(stats.netIncome)}
            </div>
            <div className="flex items-center gap-1 text-xs mt-1">
              <TrendingDown className="h-3 w-3 text-destructive" />
              <span className="text-destructive">-3.1%</span>
              <span className="text-muted-foreground">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Notifications */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-warning">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Stock faible
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.lowStockProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">Produits nécessitant un réapprovisionnement</p>
          </CardContent>
        </Card>

        <Card className="border-destructive">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4 text-destructive" />
              Rupture de stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.outOfStockProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">Produits indisponibles</p>
          </CardContent>
        </Card>

        <Card className="border-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              Commandes fournisseurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.pendingSupplyOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">En attente de livraison</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Produits les plus vendus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.quantity} unités vendues</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatPrice(product.revenue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Clients */}
        <Card>
          <CardHeader>
            <CardTitle>Meilleurs clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topClients.map((client, index) => (
                <div key={client.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {getInitials(client.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{client.name}</div>
                      <div className="text-sm text-muted-foreground">{client.totalPurchases} achats</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatPrice(client.totalSpent)}</div>
                    {client.segment === "vip" && (
                      <Badge variant="outline" className="text-xs border-primary text-primary">
                        VIP
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Commandes récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium">{order.orderNumber}</span>
                    <Badge
                      variant="outline"
                      className={
                        order.status === "delivered"
                          ? "border-success text-success"
                          : order.status === "pending"
                            ? "border-warning text-warning"
                            : "border-primary text-primary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {order.client.name} • {formatDate(order.createdAt)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatPrice(order.total)}</div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${order.paymentStatus === "paid" ? "border-success text-success" : "border-destructive text-destructive"}`}
                  >
                    {order.paymentStatus === "paid" ? "Payé" : "Non payé"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Business Health Indicators */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">68%</span>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <Progress value={68} className="h-2" />
            <p className="text-xs text-muted-foreground">Commandes payées / Total commandes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Panier moyen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{formatPrice(stats.totalRevenue / (stats.totalOrders || 1))}</span>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <Progress value={75} className="h-2" />
            <p className="text-xs text-muted-foreground">Valeur moyenne par commande</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Clients VIP</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{stats.vipClients}</span>
              <Users className="h-4 w-4 text-primary" />
            </div>
            <Progress value={(stats.vipClients / stats.totalClients) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {((stats.vipClients / stats.totalClients) * 100).toFixed(1)}% du total des clients
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
