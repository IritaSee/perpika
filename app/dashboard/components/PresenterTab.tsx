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
                      {registration.presenterRegistration && (
                        <div className="text-sm">
                          <div>
                            Topik:{" "}
                            {registration.presenterRegistration.topicPreference}
                          </div>
                          <div className="text-muted-foreground">
                            {registration.presenterRegistration.presentationTitle}
                          </div>
                          <div>
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Update Abstract</Button>
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
