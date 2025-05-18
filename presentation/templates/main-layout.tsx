import type React from "react";
import { Navbar } from "@/presentation/organisms/navbar/navbar";
import { Footer } from "@/presentation/organisms/layout/footer";

interface MainLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export function MainLayout({ children, showFooter = true }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#04081E]">
      <Navbar />
      <main className="flex-1 pt-[72px]">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
