"use client";
import { PaymentStatus } from "@prisma/client";
import { updatePaymentStatus } from "../actions";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UpdatePaymentStatusButtonProps {
  registrationId: number;
  currentStatus: PaymentStatus;
}

export function UpdatePaymentStatusButton({
  registrationId,
  currentStatus,
}: UpdatePaymentStatusButtonProps) {
  const [status, setStatus] = useState(currentStatus);

  async function updateStatus(newStatus: PaymentStatus) {
    const result = await updatePaymentStatus(registrationId, newStatus);
    if (result.success) {
      setStatus(newStatus);
    } else {
      alert("Gagal memperbarui status pembayaran.");
    }
  }

  const statusColors: Record<PaymentStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`${statusColors[status]} border-none`}
        >
          {status}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Ubah Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => updateStatus("PENDING")}
          className={statusColors["PENDING"]}
        >
          PENDING
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => updateStatus("CONFIRMED")}
          className={statusColors["CONFIRMED"]}
        >
          CONFIRMED
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => updateStatus("REJECTED")}
          className={statusColors["REJECTED"]}
        >
          REJECTED
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
