"use client"

import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type RegistrationFee = {
  id: number
  registrationType: string
  regularFee: number
  earlyBirdFee: number
}

interface PriceListProps {
  fees: RegistrationFee[]
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const formatRegistrationType = (type: string) => {
  return type
    .split('_')
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ')
}

export function PriceList({ fees }: PriceListProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Daftar Harga Registrasi</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipe Registrasi</TableHead>
            <TableHead>Harga Reguler</TableHead>
            <TableHead>Harga Early Bird</TableHead>
            <TableHead>discount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fees.map((fee) => {
            const savingsAmount = fee.regularFee - fee.earlyBirdFee
            const savingsPercent = ((savingsAmount / fee.regularFee) * 100).toFixed(0)
            return (
              <TableRow key={fee.id}>
                <TableCell className="font-medium">
                  {formatRegistrationType(fee.registrationType)}
                </TableCell>
                <TableCell>{formatCurrency(fee.regularFee)}</TableCell>
                <TableCell>{formatCurrency(fee.earlyBirdFee)}</TableCell>
                <TableCell className="text-green-600 font-medium">
                  {savingsPercent}% 
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Card>
  )
}
