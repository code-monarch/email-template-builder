import type React from "react"
import { Suspense } from "react";
import { Providers } from "@/redux/provider"
import { ThemeProvider } from "@/pattern/templates/theme-provider"
import { SkipLink } from "@/pattern/atoms/skip-link"
import type { Metadata } from "next"
import "./assets/styles/globals.css"

export const metadata: Metadata = {
  title: "Email Template Builder",
  description: "A sleek and modern email template builder",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased theme-transition">
        <SkipLink href="#main-content" />
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
