"use client";
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
import { Button } from "@/components/ui/button";
import { updateAbstractFile, updateAbstractReviewedStatus } from "../actions";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileUpload } from "@/components/ui/file-upload";
import { Badge } from "@/components/ui/badge";
import Flag from 'react-world-flags';
import { Edit, Trash2 } from "lucide-react";


// Helper function to map country name to code (from ParticipantTab)
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

// Helper function to map status (adapted from ParticipantTab)
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

interface PresenterTabProps {
  registrations: RegistrationWithRelations[];
}

export function PresenterTab({ registrations }: PresenterTabProps) {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Presenter</CardTitle>
        <CardDescription>
          Daftar semua presenter dan kelola abstrak mereka.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name/Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Session</TableHead>
              <TableHead>Affiliation</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations
              .filter((r) => r.attendingAs === "PRESENTER")
              .map((registration) => {
                const details = registration.presenterRegistration;
                const name = registration.presenterRegistration
                  ? registration.presenterRegistration.presenters[0]?.name
                  : "";
                const email = registration.presenterRegistration
                  ? registration.presenterRegistration.email
                  : "";

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
                      <div className="text-sm flex items-center gap-x-1 text-muted-foreground">
                        {email}
                        {registration.presenterRegistration && (
                          <Checkbox
                            checked={
                              registration.presenterRegistration
                                .isAbstractReviewed
                            }
                            onCheckedChange={async (checked) => {
                              if (typeof checked === "boolean") {
                                const result =
                                  await updateAbstractReviewedStatus(
                                    registration.presenterRegistration!.id,
                                    checked
                                  );
                                if (!result.success) {
                                  alert(
                                    "Failed to update abstract reviewed status"
                                  );
                                }
                              }
                            }}
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusLabel(details?.currentStatus)}</TableCell>
                    <TableCell>{registration.sessionType}</TableCell>
                    <TableCell>{details?.affiliation}</TableCell>
                    <TableCell>
                      {registration.presenterRegistration && (
                        <div className="text-sm">
                          <div className="flex items-center gap-x-1">
                            <div>
                              Topic:{" "}
                              {registration.presenterRegistration.topicPreference}
                            </div>
                            <Flag code={getCountryCode(registration.presenterRegistration.presenters[0]?.nationality)} className="h-4 w-auto" fallback={<span>{registration.presenterRegistration.presenters[0]?.nationality}</span>} />
                          </div>
                          <div className="text-muted-foreground">
                            {registration.presenterRegistration.presentationTitle}
                          </div>
                           <div>
                            Presenters: {registration.presenterRegistration.presenters.map(p => p.name).join(', ')} ({registration.presenterRegistration.presenters.length})
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
                    <div className="flex gap-x-1">
                    <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Abstract</DialogTitle>
                            <DialogDescription>
                              Upload a new abstract file (PDF).
                            </DialogDescription>
                          </DialogHeader>
                          <FileUpload
                            onChange={async (downloadURL) => {
                                if (downloadURL) {
                                    setLoadingId(registration.presenterRegistration!.id);
                                    const result = await updateAbstractFile(registration.presenterRegistration!.id, downloadURL);
                                    if (result.success) {
                                        alert("Abstract updated successfully!");
                                    } else {
                                        alert("Failed to update abstract");
                                    }
                                    setLoadingId(null)
                                }
                            }}
                          />
                            {loadingId === registration.presenterRegistration?.id && (
                                <p className="text-sm text-muted-foreground">Uploading...</p>
                            )}
                        </DialogContent>
                      </Dialog>
                      <form method="post" action="/api/registrations/delete" onSubmit={(e) => {
                        if (!confirm("Apakah anda yakin untuk menghapus?")) {
                          e.preventDefault();
                        }
                      }}>
                        <input type="hidden" name="id" value={registration.id} />
                        <Button variant="destructive" type="submit" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
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
