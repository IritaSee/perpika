"use client";
import { PaymentStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function updateStatus(newStatus: PaymentStatus) {
    startTransition(async () => {
      try {
        const response = await fetch('/api/update-payment-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            registrationId,
            paymentStatus: newStatus
          }),
        });

        const result = await response.json();

        if (result.success) {
          setStatus(newStatus);
          console.log(`Status pembayaran berhasil diubah dari ${status} ke ${newStatus}`);
          router.refresh();
        } else {
          alert("Gagal memperbarui status pembayaran.");
        }
      } catch (error) {
        console.error("Error updating payment status:", error);
        alert("Gagal memperbarui status pembayaran.");
      }
    });
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
