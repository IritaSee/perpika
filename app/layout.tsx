import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NextAuthProvider } from "@/providers/next-auth"
import { Toaster } from "sonner"
import { NavWrapper } from "@/components/nav-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ICONIK 2025 - International Conference by Indonesian Students in Korea",
  description: "ICONIK brings together scholars, educators, policymakers, and students to highlight the vital contributions of young minds in shaping Indonesia's future.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <NextAuthProvider>
          <NavWrapper />
          {children}
        </NextAuthProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
