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
import { Badge } from "@/components/ui/badge";
import Flag from 'react-world-flags';

// Helper function to map country name to code
function getCountryCode(countryName: string | undefined): string {
  if (!countryName) {
    return '';
  }
  const countryMap: { [key: string]: string } = {
    "Indonesia": "ID",
    "Malaysia": "MY",
    "Singapore": "SG",
    "Thailand": "TH",
    "Vietnam": "VN",
    "Philippines": "PH",
    "Japan": "JP",
    "South Korea": "KR",
    "China": "CN",
    "India": "IN",
    "Australia": "AU",
    "United States": "US",
    "United Kingdom": "GB",
    "Germany": "DE",
    "France": "FR",
    "Netherlands": "NL",
    "Other": ""
  };

  return countryMap[countryName] || ''; // Return empty string if not found
}

interface ParticipantTabProps {
  registrations: RegistrationWithRelations[];
}

// Helper function to map status
function getStatusLabel(status: string | undefined) {
  switch (status) {
    case "WAITING_FOR_PAYMENT":
      return "Waiting for Payment";
    case "REGISTERED":
      return "Registered";
    case "-":
      return "Incomplete";
    case "BACHELOR_STUDENT":
      return "Bachelor Student";
    case "MASTER_STUDENT":
      return "Master Student";
    case "PHD_STUDENT":
      return "PhD Student";
    case "RESEARCHER_PROFESSIONAL":
      return "Researcher/Professional";
    case "OTHER":
      return "Other";
    default:
      return status || "Unknown";
  }
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
                      <div className="flex items-center gap-x-1">
                        <div className="font-medium">{name}</div>
                        <Badge>{registration.attendingAs}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {email}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusLabel(details?.currentStatus)}</TableCell>
                    <TableCell>{registration.sessionType}</TableCell>
                    <TableCell>{details?.affiliation}</TableCell>
                    <TableCell>
                      {registration.participantRegistration && (
                        <div className="text-sm">
                          <div className="flex items-center gap-x-1">
                            Kewarganegaraan:{" "}
                            <Flag code={getCountryCode(registration.participantRegistration.nationality)} className="h-4 w-auto" fallback={<span>{registration.participantRegistration.nationality}</span>} />
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
