"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AttendingAs, SessionType } from "@prisma/client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function RegistrationFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder="Cari berdasarkan nama atau email..."
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => {
            router.push(
              pathname + "?" + createQueryString("search", e.target.value)
            )
          }}
          className="max-w-sm"
        />
      </div>
      <Select
        defaultValue={searchParams.get("type") ?? "all"}
        onValueChange={(value) => {
          router.push(pathname + "?" + createQueryString("type", value === "all" ? "" : value))
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tipe Pendaftar" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Tipe</SelectItem>
          <SelectItem value={AttendingAs.PRESENTER}>Presenter</SelectItem>
          <SelectItem value={AttendingAs.PARTICIPANT}>Peserta</SelectItem>
        </SelectContent>
      </Select>
      <Select
        defaultValue={searchParams.get("session") ?? "all"}
        onValueChange={(value) => {
          router.push(pathname + "?" + createQueryString("session", value === "all" ? "" : value))
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tipe Sesi" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Sesi</SelectItem>
          <SelectItem value={SessionType.ONLINE}>Online</SelectItem>
          <SelectItem value={SessionType.OFFLINE}>Offline</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
