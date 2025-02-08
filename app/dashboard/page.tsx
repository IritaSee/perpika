import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { LogoutButton } from "@/components/auth/logout-button";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RegistrationFilters } from "./components/registration-filters";
import { Suspense } from "react";
import { AttendingAs, SessionType } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParticipantTab } from "./components/ParticipantTab";
import { PresenterTab } from "./components/PresenterTab";
import { PaymentStatusTab } from "./components/PaymentStatusTab";
import { AbstractTab } from "./components/AbstractTab";
import { RegistrationWithRelations } from "../types";

type SearchParams = {
  search?: string;
  type?: AttendingAs;
  session?: SessionType;
};

interface PageProps {
  searchParams: SearchParams;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

    // Get searchParams values
    const params = await Promise.resolve(searchParams)

    // Get filtered registrations
    const registrations: RegistrationWithRelations[] = await db.registration.findMany({
      where: {
        AND: [
          params.type
            ? { attendingAs: params.type }
            : {},
          params.session
            ? { sessionType: params.session }
            : {},
          params.search
            ? {
                OR: [
                  {
                    presenterRegistration: {
                      OR: [
                        { email: { contains: params.search, mode: 'insensitive' } },
                        { presenters: { some: { name: { contains: params.search, mode: 'insensitive' } } } }
                      ]
                    }
                  },
                  {
                    participantRegistration: {
                      OR: [
                        { email: { contains: params.search, mode: 'insensitive' } },
                        { fullName: { contains: params.search, mode: 'insensitive' } }
                      ]
                    }
                  }
                ]
              }
            : {},
        ],
      },
      include: {
        presenterRegistration: {
          include: {
            presenters: true,
          },
        },
        participantRegistration: true,
      },
      orderBy: {
        id: 'desc'
      }
    })

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Admin</h1>
          <p className="text-muted-foreground mt-2">
            Kelola semua pendaftaran peserta
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="grid gap-6">
        <Suspense>
          <RegistrationFilters />
        </Suspense>

        {/* Stats Card */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pendaftar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{registrations.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Presenter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {registrations.filter((r) => r.attendingAs === "PRESENTER").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Peserta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {registrations.filter((r) => r.attendingAs === "PARTICIPANT").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dietary Preferences Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Vegan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  registrations.filter(
                    (r) =>
                      r.sessionType === "OFFLINE" &&
                      (r.presenterRegistration?.dietaryPreference === "VEGAN" ||
                        r.participantRegistration?.dietaryPreference === "VEGAN")
                  ).length
                }
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Halal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  registrations.filter(
                    (r) =>
                      r.sessionType === "OFFLINE" &&
                      (r.presenterRegistration?.dietaryPreference === "HALAL" ||
                        r.participantRegistration?.dietaryPreference === "HALAL")
                  ).length
                }
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="peserta" className="space-y-4">
          <TabsList>
            <TabsTrigger value="peserta">Peserta</TabsTrigger>
            <TabsTrigger value="presenter">Presenter</TabsTrigger>
            <TabsTrigger value="status_pembayaran">Status Pembayaran</TabsTrigger>
            <TabsTrigger value="abstrak">Abstrak</TabsTrigger>
          </TabsList>
          <TabsContent value="peserta">
            <ParticipantTab registrations={registrations} />
          </TabsContent>
          <TabsContent value="presenter">
            <PresenterTab registrations={registrations} />
          </TabsContent>
          <TabsContent value="status_pembayaran">
            <PaymentStatusTab registrations={registrations} />
          </TabsContent>
          <TabsContent value="abstrak">
            <AbstractTab registrations={registrations} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
