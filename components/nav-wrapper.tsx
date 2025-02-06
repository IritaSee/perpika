"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "./navbar"

export function NavWrapper() {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith("/dashboard")

  if (isDashboard) {
    return null
  }

  return <Navbar />
}
