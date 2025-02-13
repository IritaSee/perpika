"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface ExportButtonProps {
  onExport: () => void
}

export function ExportButton({ onExport }: ExportButtonProps) {
  return (
    <Button onClick={onExport} variant="outline" className="gap-2">
      <Download className="h-4 w-4" />
      Export ke CSV
    </Button>
  )
}
