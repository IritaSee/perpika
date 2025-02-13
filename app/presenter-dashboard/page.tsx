import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { LogoutButton } from "@/components/auth/logout-button";
import {
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  Clock,
  Building,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { PaperStatus, PaymentStatus, Role } from "@prisma/client";
import { RevisionUpload } from "./components/revision-upload";

export default async function PresenterDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Get user with presenter registration data
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      presenterRegistration: {
        include: {
          registration: true,
          presenters: {
            orderBy: {
              order: 'asc'
            }
          }
        }
      }
    }
  });

  if (!user || user.role !== Role.PRESENTER) {
    redirect("/login");
  }

  if (!user.presenterRegistration) {
    return (
      <div className="container mx-auto py-10">
        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/50 p-4 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200">
            You haven't registered as a presenter yet. Please complete your registration first.
          </p>
        </div>
      </div>
    );
  }

  const { registration, presenters, paperStatus, presentationTitle } = user.presenterRegistration;

  const getPaymentStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-500";
      case "REJECTED":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  const getPaperStatusColor = (status: PaperStatus) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-500";
      case "REVISION_REQUESTED":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  const getPaperStatusText = (status: PaperStatus) => {
    switch (status) {
      case "ACCEPTED":
        return "Accepted";
      case "REVISION_REQUESTED":
        return "Revision Required";
      default:
        return "Under Review";
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6 rounded-lg mb-8 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Presenter Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage and monitor your paper status
              </p>
            </div>
          </div>
          <LogoutButton className="flex items-center gap-2 hover:bg-destructive/90 transition-colors" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Presentation Information</CardTitle>
            <CardDescription>Presentation details and paper status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Presentation Title:</span>
              </div>
              <p className="text-sm pl-6">{presentationTitle}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Presenters:</span>
              </div>
              <ul className="text-sm pl-6 space-y-1">
                {presenters.map((presenter) => (
                  <li key={presenter.id}>
                    {presenter.name} ({presenter.nationality})
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div>
                <Badge className={getPaperStatusColor(paperStatus)}>
                  Paper Status: {getPaperStatusText(paperStatus)}
                </Badge>
              </div>

              {paperStatus === "REVISION_REQUESTED" && (
                <RevisionUpload 
                  userId={user.id}
                  presenters={presenters}
                />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Registration Information</CardTitle>
            <CardDescription>Session and payment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Session Type:</span>
              </div>
              <p className="text-sm pl-6">
                {registration.sessionType === "ONLINE" ? "Online" : "Offline"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Registration Type:</span>
              </div>
              <p className="text-sm pl-6">
                {registration.registrationType.replace(/_/g, " ")}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Payment Status:</span>
              </div>
              <div className="pl-6">
                <Badge className={getPaymentStatusColor(registration.paymentStatus)}>
                  {registration.paymentStatus === "CONFIRMED" 
                    ? "Confirmed" 
                    : registration.paymentStatus === "REJECTED"
                    ? "Rejected"
                    : "Pending"}
                </Badge>
                {registration.isEarlyBird && (
                  <Badge className="ml-2 bg-purple-500">Early Bird</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
