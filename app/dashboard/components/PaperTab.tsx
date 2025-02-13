"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RegistrationWithRelations } from "../../types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { ExportButton } from "./ExportButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaperStatus } from "@prisma/client";
import { updatePaperStatus, updatePresenterComment } from "../actions";
import { Textarea } from "@/components/ui/textarea";

interface PaperTabProps {
  registrations: RegistrationWithRelations[];
}

export function PaperTab({ registrations }: PaperTabProps) {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [comments, setComments] = useState<{[key: number]: string}>({});

  const handleExport = () => {
    // Prepare CSV headers
    const headers = [
      "ID",
      "Presenters",
      "Email",
      "Judul Presentasi",
      "Paper URL",
      "Status Paper",
      "Komentar"
    ].join(",");

    // Prepare CSV rows
    const rows = registrations
      .filter((r) => r.attendingAs === "PRESENTER")
      .map((registration) => {
        const details = registration.presenterRegistration;
        const presenters = details?.presenters.map(p => p.name).join(", ") || "";
        const comment = details?.presenters[0]?.comment || "";
        
        return [
          registration.id,
          presenters,
          details?.email || "",
          details?.presentationTitle || "",
          details?.PaperSubmission || "",
          details?.paperStatus?.replace(/_/g, " ") || "",
          comment
        ].map(value => `"${value}"`).join(",");
      });

    // Combine headers and rows
    const csv = [headers, ...rows].join("\n");

    // Create and trigger download
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `papers-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Paper</CardTitle>
            <CardDescription>
              Lihat dan kelola Paper yang dikirimkan oleh presenter.
            </CardDescription>
          </div>
          <ExportButton onExport={handleExport} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Presenters / Email</TableHead>
              <TableHead>Judul Presentasi</TableHead>
              <TableHead>Paper</TableHead>
              <TableHead>Status Paper</TableHead>
              <TableHead>Komentar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations
              .filter((r) => r.attendingAs === "PRESENTER")
              .map((registration) => {
                const name = registration.presenterRegistration
                  ? registration.presenterRegistration.presenters
                      .map((p) => p.name)
                      .join(", ")
                  : "";
                const email = registration.presenterRegistration?.email || "";
                const title =
                  registration.presenterRegistration?.presentationTitle || "";
                const PaperPath =
                  registration.presenterRegistration?.PaperSubmission || "";
                const paperStatus =
                  registration.presenterRegistration?.paperStatus;

                return (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">{registration.id}</TableCell>
                    <TableCell>
                      <div>{name}</div>
                      <div className="text-sm text-muted-foreground">
                        {email}
                      </div>
                    </TableCell>
                    <TableCell>{title}</TableCell>
                    <TableCell>
                      {PaperPath ? (
                        PaperPath === "test" ? (
                          <p>Paper Not Uploaded</p>
                        ) : (
                          <Button variant="outline" asChild>
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`/dashboard/Papers/${registration.presenterRegistration?.id}`}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Paper
                            </Link>
                          </Button>
                        )
                      ) : (
                        "Tidak ada Paper"
                      )}
                    </TableCell>
                    <TableCell>
                      {registration.presenterRegistration && (
                        <Select
                          defaultValue={paperStatus}
                          onValueChange={async (value) => {
                            setLoadingId(registration.presenterRegistration!.id);
                            const result = await updatePaperStatus(
                              registration.presenterRegistration!.id,
                              value as PaperStatus
                            );
                            if (!result.success) {
                              alert("Gagal mengubah status Paper");
                            }
                            setLoadingId(null);
                          }}
                        >
                          <SelectTrigger className="border-0 p-0 h-auto w-auto bg-transparent [&>span]:p-0 [&>span]:h-auto">
                            <div className="flex items-center gap-1">
                              <Badge
                                variant={
                                  paperStatus === 'ACCEPTED' ? 'success' :
                                  paperStatus === 'REVISION_REQUESTED' ? 'warning' :
                                  'secondary'
                                }
                              >
                                {paperStatus?.replace(/_/g, ' ')}
                              </Badge>
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(PaperStatus).map((status) => (
                              <SelectItem key={status} value={status}>
                                {status.replace(/_/g, " ")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                    <TableCell>
                      {registration.presenterRegistration?.presenters[0] && (
                        <Textarea
                          placeholder="Tambahkan komentar..."
                          defaultValue={registration.presenterRegistration.presenters[0].comment || ""}
                          onChange={(e) => {
                            setComments({
                              ...comments,
                              [registration.presenterRegistration!.presenters[0].id]: e.target.value
                            });
                          }}
                          onBlur={async () => {
                            const presenterId = registration.presenterRegistration!.presenters[0].id;
                            const comment = comments[presenterId] || "";
                            const result = await updatePresenterComment(presenterId, comment);
                            if (!result.success) {
                              alert("Gagal menyimpan komentar");
                            }
                          }}
                          className="min-h-[100px]"
                        />
                      )}
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
