"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  
  const navItems = [
    { name: "About ICONIK", href: "/#about" },
    { name: "Topics", href: "/#topics" },
    { name: "Registration Fee", href: "/#registration" },
    { name: "Keynote Speaker", href: "/#keynote" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center max-w-7xl mx-auto px-4">
        <div className="mr-8 hidden md:flex items-center gap-4 max-w-xs">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/perpika.png"
              alt="ICONIK 2025"
              width={40}
              height={40}
              className="object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold">ICONIK 2025</span>
              <span className="text-xs text-muted-foreground">International Conference by Indonesian Students in Korea</span>
            </div>
          </Link>
        </div>
        <nav className="flex items-center justify-center space-x-6 text-sm font-medium max-w-xl mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4 max-w-xs">
          <Link href="/register-event">
            <Button className="bg-primary hover:bg-primary/90">
              Register Event
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
