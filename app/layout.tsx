import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Analytics from "./analytics";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { UserProvider } from "@/context/UserContext";
import TokenValidator from '@/components/auth/TokenValidator';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Senavia Corp",
  description: "Digital Agency That Generates Business Growth",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Hydrate user from server-side cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  let initialUser = null;

  if (token) {
    try {
      const decoded: any = decodeJwt(token);
      initialUser = {
        id: decoded.id || "",
        email: decoded.email || "",
        name: decoded.name || "",
        phone: decoded.phone || "",
        address: decoded.address || "",
        // Add other fields as needed
      };
      console.log("Initial User:", initialUser);
    } catch (e) {
      initialUser = null;
    }
  }

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/senavia/senavia.ico" />
        <title>Senavia Corp</title>
        <meta name="description" content="Digital Agency That Generates Business Growth" />
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Senavia Corp" />
        <meta property="og:description" content="Digital Agency That Generates Business Growth" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/senavia/main.jpeg" />
        <meta property="og:url" content="https://senavia.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Senavia Corp" />
        <meta name="twitter:description" content="Digital Agency That Generates Business Growth" />
        <meta name="twitter:image" content="/senavia/main.jpeg" />
      </head>
      <body className={`${inter.className} bg-[#050A2B]`}>
        <Suspense>
          <Analytics />
        </Suspense>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <UserProvider initialUser={initialUser}>
            <TokenValidator />
            {children}
          </UserProvider>
        </ThemeProvider>
        <Toaster
          richColors
          toastOptions={{
            style: {
              background: "#04081E",
              color: "white",
            },
          }}
        />
      </body>
    </html>
  );
}
