import type React from "react";
import { Navbar } from "@/presentation/organisms/navbar/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="hidden md:flex w-64 flex-col border-r bg-muted p-4">
          <nav className="space-y-2">
            <a href="/dashboard" className="block px-3 py-2 rounded-md hover:bg-background">
              Dashboard
            </a>
            <a href="/dashboard/profile" className="block px-3 py-2 rounded-md hover:bg-background">
              Profile
            </a>
            <a
              href="/dashboard/settings"
              className="block px-3 py-2 rounded-md hover:bg-background"
            >
              Settings
            </a>
          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
