import { Sidebar } from "@/components/dashboard/sidebar";
import { UserProfileButton } from "@/components/auth/user-button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-background border-b p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold"></h1>
          <UserProfileButton />
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}