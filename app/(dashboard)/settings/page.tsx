import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Store Details</CardTitle>
          <CardDescription>
            Update your store's name and branding.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">Store Name</Label>
            <Input id="store-name" defaultValue="My Store" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo">Logo</Label>
            <Input id="logo" type="file" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage user roles and permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            User management settings will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}