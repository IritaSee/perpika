"use client";
import { PaymentStatus } from "@prisma/client";
import { updatePaymentStatus } from "../actions";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";

interface UpdatePaymentStatusButtonProps {
    registrationId: number;
    currentStatus: PaymentStatus;
}

export function UpdatePaymentStatusButton({
    registrationId,
    currentStatus
}: UpdatePaymentStatusButtonProps) {
    const [status, setStatus] = useState(currentStatus)
    const [open, setOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<PaymentStatus | null>(null)

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">
                        {status}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Ubah Status Pembayaran</AlertDialogTitle>
                        <AlertDialogDescription>
                            Pilih status pembayaran baru:
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex space-x-2">
                        <Button variant={selectedStatus === "CONFIRMED" ? "default" : "outline"} onClick={() => setSelectedStatus("CONFIRMED")}>
                            Confirmed
                        </Button>
                        <Button variant={selectedStatus === "PENDING" ? "default" : "outline"} onClick={() => setSelectedStatus("PENDING")}>
                            Pending
                        </Button>
                        <Button variant={selectedStatus === "REJECTED" ? "destructive" : "outline"} onClick={() => setSelectedStatus("REJECTED")}>
                            Rejected
                        </Button>

                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            if (selectedStatus) {
                              const result = await updatePaymentStatus(registrationId, selectedStatus);
                              if (result.success) {
                                setStatus(selectedStatus);
                                setOpen(false)
                              }
                            }
                          }}
                        >
                            Simpan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    )
}
