import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Senavia Corp",
  description: "Digital Agency That Generates Business Growth",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} bg-[#050A2B]`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster
          richColors
          // # TODO: revisar aqui el cambio de estilos
          toastOptions={{
            style: {
              background: "#04081E", // aqui markus !!!
            },
          }}
        />
      </body>
    </html>
  );
}
