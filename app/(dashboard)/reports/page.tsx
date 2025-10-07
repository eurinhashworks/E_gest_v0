"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, BarChart3, PieChart, TrendingUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function ReportsPage() {
  const [period, setPeriod] = useState("month")

  const reports = [
    {
      id: "sales",
      title: "Rapport des ventes",
      description: "Analyse détaillée des ventes par période",
      icon: TrendingUp,
      color: "text-success",
    },
    {
      id: "products",
      title: "Rapport des produits",
      description: "Performance des produits et stock",
      icon: BarChart3,
      color: "text-primary",
    },
    {
      id: "clients",
      title: "Rapport clients",
      description: "Analyse de la base clients et segmentation",
      icon: PieChart,
      color: "text-accent",
    },
    {
      id: "financial",
      title: "Rapport financier",
      description: "Revenus, dépenses et rentabilité",
      icon: FileText,
      color: "text-warning",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rapports & Statistiques</h1>
          <p className="text-muted-foreground">Générez et exportez vos rapports d'activité</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Cette semaine</SelectItem>
            <SelectItem value="month">Ce mois</SelectItem>
            <SelectItem value="quarter">Ce trimestre</SelectItem>
            <SelectItem value="year">Cette année</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="custom">Rapports personnalisés</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <report.icon className={`h-8 w-8 ${report.color}`} />
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Exporter
                    </Button>
                  </div>
                  <CardTitle className="mt-4">{report.title}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Exporter en PDF
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Exporter en Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Créer un rapport personnalisé</CardTitle>
              <CardDescription>Sélectionnez les données à inclure dans votre rapport</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                La fonctionnalité de rapports personnalisés sera disponible prochainement.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Indicateurs clés de performance (KPI)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Taux de croissance</div>
              <div className="text-2xl font-bold text-success">+12.5%</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Marge bénéficiaire</div>
              <div className="text-2xl font-bold">28.3%</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Taux de rétention</div>
              <div className="text-2xl font-bold text-primary">85%</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Satisfaction client</div>
              <div className="text-2xl font-bold text-accent">4.8/5</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
