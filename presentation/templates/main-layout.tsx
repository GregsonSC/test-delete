import type React from "react";
import { Navbar } from "@/presentation/organisms/navbar/navbar";
import { Footer } from "@/presentation/organisms/footer/footer";

interface MainLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export function MainLayout({ children, showFooter = true }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <Navbar />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
