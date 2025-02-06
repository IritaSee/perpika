"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, Info, BookOpen, Users,  } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { IconCreditCard } from "@tabler/icons-react"

export function Navbar() {
  const pathname = usePathname()
  
  const navItems = [
    { name: "About ICONIK", href: "/#about", icon: Info },
    { name: "Topics", href: "/#topics", icon: BookOpen },
    { name: "Registration Fee", href: "/#registration", icon: IconCreditCard },
    { name: "Keynote Speaker", href: "/#keynote", icon: Users },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center max-w-7xl mx-auto px-4">
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetTitle>Menu</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "transition-colors hover:text-foreground/80 text-lg flex items-center gap-3",
                      pathname === item.href ? "text-foreground" : "text-foreground/60"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
                <Link href="/register-event" className="mt-4">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Register Event
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
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
        {/* Mobile Logo */}
        <div className="md:hidden flex items-center gap-3 mx-auto">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/perpika.png"
              alt="ICONIK 2025"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-lg font-semibold">ICONIK 2025</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-6 text-sm font-medium max-w-xl mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80 flex items-center gap-2",
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden md:flex items-center space-x-4 max-w-xs">
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
