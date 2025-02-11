"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className }: LogoutButtonProps) {
  return (
    <Button
      variant="destructive"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className={className}
    >
      <LogOut className="h-4 w-4 mr-2" />
      Keluar
    </Button>
  )
}
