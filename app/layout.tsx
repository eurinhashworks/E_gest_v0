import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"

/**
 * @description The metadata for the application, including the title and description.
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: "Gestion E-commerce - Tableau de bord",
  description: "Application de gestion e-commerce complète",
  generator: "v0.app",
}

/**
 * @component RootLayout
 * @description The root layout for the entire application. It sets up the HTML structure,
 * includes global fonts and styles, and wraps the application with necessary providers
 * like `AuthProvider` and `Toaster`.
 * @param {{ children: React.ReactNode }} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
