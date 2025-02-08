"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RegistrationWithRelations } from "../../types";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface AbstractTabProps {
  registrations: RegistrationWithRelations[];
}

export function AbstractTab({ registrations }: AbstractTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Abstrak</CardTitle>
        <CardDescription>Lihat dan kelola abstrak yang dikirimkan oleh presenter.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama Presenter</TableHead>
              <TableHead>Judul Presentasi</TableHead>
              <TableHead>Abstrak</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations
              .filter((r) => r.attendingAs === "PRESENTER")
              .map((registration) => {
                const name = registration.presenterRegistration
                  ? registration.presenterRegistration.presenters.map(p => p.name).join(', ')
                  : "";
                const title = registration.presenterRegistration?.presentationTitle || "";
                const abstractPath =
                  registration.presenterRegistration?.abstractSubmission || "";

                return (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">{registration.id}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{title}</TableCell>
                    <TableCell>
                      {abstractPath ? (
                        abstractPath === "test" ? (
                            <p>Abstract Not Uploaded</p>
                        ) : (
                          <Button variant="link" asChild>
                            <Link href={`/dashboard/abstracts/${registration.presenterRegistration?.id}`}>
                                Lihat Abstrak
                            </Link>
                          </Button>
                        )
                      ) : (
                        "Tidak ada abstrak"
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
