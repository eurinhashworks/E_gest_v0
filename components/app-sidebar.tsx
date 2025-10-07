"use client"

import {
  Home,
  Package,
  ShoppingCart,
  Users,
  Truck,
  DollarSign,
  Settings,
  Bell,
  BarChart3,
  Shield,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: Home },
  { name: "Produits", href: "/products", icon: Package },
  { name: "Ventes", href: "/sales", icon: ShoppingCart },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Fournisseurs", href: "/suppliers", icon: Truck },
  { name: "Finances", href: "/finances", icon: DollarSign },
  { name: "Rapports", href: "/reports", icon: BarChart3 },
  { name: "Journal", href: "/activity", icon: Activity },
  { name: "Utilisateurs", href: "/users", icon: Shield },
]

const secondaryNavigation = [
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Paramètres", href: "/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Package className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">E-commerce</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="border-t p-3 space-y-1">
        {secondaryNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
