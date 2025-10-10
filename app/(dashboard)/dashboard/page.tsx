import { UserProfileButton } from "@/components/auth/user-button";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <UserProfileButton />
      </header>
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h2>
        <p className="text-muted-foreground">
          This is where you will see an overview of your store's performance.
        </p>
      </main>
    </div>
  );
}