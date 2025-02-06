import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { LogoutButton } from "@/components/auth/logout-button"
import { Button } from "@/components/ui/button"
import { DeleteRegistrationButton } from "@/app/dashboard/components/DeleteRegistrationButton"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { db } from "@/lib/db"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RegistrationFilters } from "./components/registration-filters"
import { Suspense } from "react"
import { 
  AttendingAs, 
  SessionType, 
  Registration, 
  PresenterRegistration, 
  ParticipantRegistration,
  Presenter
} from "@prisma/client"


type RegistrationWithRelations = Registration & {
  presenterRegistration: (PresenterRegistration & {
    presenters: Presenter[]
  }) | null
  participantRegistration: ParticipantRegistration | null
}

type SearchParams = {
  search?: string
  type?: AttendingAs
  session?: SessionType
}

interface PageProps {
  searchParams: SearchParams
}

export default async function DashboardPage({
  searchParams,
}: PageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
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
          <p className="text-muted-foreground mt-2">Kelola semua pendaftaran peserta</p>
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
                {registrations.filter(r => r.attendingAs === 'PRESENTER').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Peserta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {registrations.filter(r => r.attendingAs === 'PARTICIPANT').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registrations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Pendaftar</CardTitle>
            <CardDescription>
              Daftar semua pendaftar yang telah mendaftar untuk acara
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
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((registration) => {
                  const details = registration.presenterRegistration || registration.participantRegistration
                  const name = registration.presenterRegistration 
                    ? registration.presenterRegistration.presenters[0]?.name 
                    : registration.participantRegistration?.fullName
                  const email = registration.presenterRegistration
                    ? registration.presenterRegistration.email
                    : registration.participantRegistration?.email
                  
                  return (
                    <TableRow key={registration.id}>
                      <TableCell className="font-medium">{registration.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{name}</div>
                        <div className="text-sm text-muted-foreground">{email}</div>
                      </TableCell>
                      <TableCell>{registration.attendingAs}</TableCell>
                      <TableCell>{details?.currentStatus}</TableCell>
                      <TableCell>{registration.sessionType}</TableCell>
                      <TableCell>{details?.affiliation}</TableCell>
                      <TableCell>
                        {registration.presenterRegistration && (
                          <div className="text-sm">
                            <div>Topik: {registration.presenterRegistration.topicPreference}</div>
                            <div className="text-muted-foreground">
                              {registration.presenterRegistration.presentationTitle}
                            </div>
                          </div>
                        )}
                        {registration.participantRegistration && (
                          <div className="text-sm">
                            <div>Kewarganegaraan: {registration.participantRegistration.nationality}</div>
                            <div className="text-muted-foreground">
                              {registration.participantRegistration.cityState}
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <DeleteRegistrationButton registrationId={registration.id} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
