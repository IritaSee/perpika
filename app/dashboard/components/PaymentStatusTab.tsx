import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteRegistrationButton } from "./DeleteRegistrationButton";
import { UpdatePaymentStatusButton } from "./UpdatePaymentStatusButton";
import { RegistrationWithRelations } from "../../types";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface PaymentStatusTabProps {
  registrations: RegistrationWithRelations[];
}

export function PaymentStatusTab({ registrations }: PaymentStatusTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Pembayaran</CardTitle>
        <CardDescription>Kelola status pembayaran semua pendaftar.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama/Email</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Status Pembayaran</TableHead>
              <TableHead>Bukti Pembayaran</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.map((registration) => {
              const name = registration.presenterRegistration
                ? registration.presenterRegistration.presenters[0]?.name
                : registration.participantRegistration?.fullName;
              const email = registration.presenterRegistration
                ? registration.presenterRegistration.email
                : registration.participantRegistration?.email;

              return (
                <TableRow key={registration.id}>
                  <TableCell className="font-medium">
                    {registration.id}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{name}</div>
                    <div className="text-sm text-muted-foreground">
                      {email}
                    </div>
                  </TableCell>
                  <TableCell>{registration.attendingAs}</TableCell>
                  <TableCell>
                    <UpdatePaymentStatusButton
                      registrationId={registration.id}
                      currentStatus={registration.paymentStatus}
                    />
                  </TableCell>
                  <TableCell>
                    {registration.proofOfPayment && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Image
                            src={registration.proofOfPayment}
                            alt="Bukti Pembayaran"
                            width={50}
                            height={50}
                            className="rounded cursor-pointer"
                          />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[80%] sm:max-h-[80%] overflow-auto">
                          <VisuallyHidden>
                            <DialogTitle>Bukti Pembayaran</DialogTitle>
                          </VisuallyHidden>
                          <Image
                            src={registration.proofOfPayment}
                            alt="Bukti Pembayaran"
                            width={800}
                            height={800}
                            className="rounded mx-auto"
                          />
                        </DialogContent>
                      </Dialog>
                    )}
                  </TableCell>
                  <TableCell>
                    <DeleteRegistrationButton registrationId={registration.id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
