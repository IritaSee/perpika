import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteRegistrationButton } from "./DeleteRegistrationButton";
import { UpdatePaymentStatusButton } from "./UpdatePaymentStatusButton";
import { RegistrationWithRelations } from "../../types";

interface ParticipantTabProps {
  registrations: RegistrationWithRelations[];
}

export function ParticipantTab({ registrations }: ParticipantTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Peserta</CardTitle>
        <CardDescription>Daftar semua peserta yang telah mendaftar.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama/Email</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sesi</TableHead>
              <TableHead>Afiliasi</TableHead>
              <TableHead>Detail</TableHead>
              <TableHead>Status Pembayaran</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations
              .filter((r) => r.attendingAs === "PARTICIPANT")
              .map((registration) => {
                const details = registration.participantRegistration;
                const name = registration.participantRegistration?.fullName;
                const email = registration.participantRegistration?.email;

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
                    <TableCell>{details?.currentStatus}</TableCell>
                    <TableCell>{registration.sessionType}</TableCell>
                    <TableCell>{details?.affiliation}</TableCell>
                    <TableCell>
                      {registration.participantRegistration && (
                        <div className="text-sm">
                          <div>
                            Kewarganegaraan:{" "}
                            {registration.participantRegistration.nationality}
                          </div>
                          <div className="text-muted-foreground">
                            {registration.participantRegistration.cityState}
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <UpdatePaymentStatusButton
                        registrationId={registration.id}
                        currentStatus={registration.paymentStatus}
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteRegistrationButton
                        registrationId={registration.id}
                      />
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
