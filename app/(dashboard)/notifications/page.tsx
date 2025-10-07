"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, AlertTriangle, Package, CheckCircle2, Info } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockNotifications, type Notification } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const { toast } = useToast()

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
    toast({
      title: "Notifications marquées",
      description: "Toutes les notifications ont été marquées comme lues.",
    })
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "error":
        return <Package className="h-5 w-5 text-red-600" />
      case "info":
        return <Info className="h-5 w-5 text-blue-600" />
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
    }
  }

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "warning":
        return "border-l-yellow-500"
      case "error":
        return "border-l-red-500"
      case "info":
        return "border-l-blue-500"
      case "success":
        return "border-l-green-500"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount} notification{unreadCount > 1 ? "s" : ""} non lue{unreadCount > 1 ? "s" : ""}
          </p>
        </div>
        <Button variant="outline" onClick={handleMarkAllRead} disabled={unreadCount === 0}>
          <Bell className="h-4 w-4 mr-2" />
          Tout marquer comme lu
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            Toutes
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">Non lues</TabsTrigger>
          <TabsTrigger value="read">Lues</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`border-l-4 ${getNotificationColor(notification.type)}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getNotificationIcon(notification.type)}
                    <div>
                      <CardTitle className="text-base">{notification.title}</CardTitle>
                      <CardDescription className="mt-1">{formatTimestamp(notification.createdAt)}</CardDescription>
                    </div>
                  </div>
                  {!notification.read && <Badge variant="secondary">Nouveau</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{notification.message}</p>
                {notification.link && (
                  <p className="text-xs text-muted-foreground mt-2">Module: {notification.module}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {notifications
            .filter((n) => !n.read)
            .map((notification) => (
              <Card key={notification.id} className={`border-l-4 ${getNotificationColor(notification.type)}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getNotificationIcon(notification.type)}
                      <div>
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                        <CardDescription className="mt-1">{formatTimestamp(notification.createdAt)}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">Nouveau</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{notification.message}</p>
                  {notification.link && (
                    <p className="text-xs text-muted-foreground mt-2">Module: {notification.module}</p>
                  )}
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="read" className="space-y-4">
          {notifications
            .filter((n) => n.read)
            .map((notification) => (
              <Card key={notification.id} className={`border-l-4 ${getNotificationColor(notification.type)}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {getNotificationIcon(notification.type)}
                    <div>
                      <CardTitle className="text-base">{notification.title}</CardTitle>
                      <CardDescription className="mt-1">{formatTimestamp(notification.createdAt)}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{notification.message}</p>
                  {notification.link && (
                    <p className="text-xs text-muted-foreground mt-2">Module: {notification.module}</p>
                  )}
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
