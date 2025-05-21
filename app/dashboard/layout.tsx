import type React from "react";
import { DashboardLayout } from "@/presentation/templates/dashboard-layout";
import { checkAuth } from "@/middleware/auth-middleware";

export default async function Layout({ children }: { children: React.ReactNode }) {
  // Check authentication before rendering dashboard
  //await checkAuth();

  return <DashboardLayout>{children}</DashboardLayout>;
}
