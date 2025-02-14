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
        return "text-green-500 border-green-200 bg-green-50 dark:bg-green-500/10 dark:border-green-500/20";
      case "REJECTED":
        return "text-red-500 border-red-200 bg-red-50 dark:bg-red-500/10 dark:border-red-500/20";
      default:
        return "text-yellow-500 border-yellow-200 bg-yellow-50 dark:bg-yellow-500/10 dark:border-yellow-500/20";
    }
  };

  const getPaperStatusColor = (status: PaperStatus) => {
    switch (status) {
      case "ACCEPTED":
        return "text-green-500 border-green-200 bg-green-50 dark:bg-green-500/10 dark:border-green-500/20";
      case "REVISION_REQUESTED":
        return "text-yellow-500 border-yellow-200 bg-yellow-50 dark:bg-yellow-500/10 dark:border-yellow-500/20";
      default:
        return "text-blue-500 border-blue-200 bg-blue-50 dark:bg-blue-500/10 dark:border-blue-500/20";
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
    <div className="container mx-auto py-6">
      <div className="relative mb-8">
        <div className="flex h-16 items-center px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-4">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Presenter Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Manage and monitor your paper status
              </p>
            </div>
          </div>
          <div className="ml-auto">
            <LogoutButton className="gap-2" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card className="border shadow-sm transition-all hover:shadow-md">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-semibold">Presentation Information</CardTitle>
            <CardDescription>Presentation details and paper status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 pb-2 border-b">
                <FileText className="h-5 w-5 text-primary/70" />
                <span className="font-medium">Presentation Title</span>
              </div>
              <p className="text-sm pl-8 text-muted-foreground">{presentationTitle}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 pb-2 border-b">
                <Users className="h-5 w-5 text-primary/70" />
                <span className="font-medium">Presenters</span>
              </div>
              <ul className="text-sm pl-8 space-y-2 text-muted-foreground">
                {presenters.map((presenter) => (
                  <li key={presenter.id}>
                    {presenter.name} ({presenter.nationality})
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`${getPaperStatusColor(paperStatus)} px-3 py-1`}>
                  <span className="mr-2">●</span>
                  {getPaperStatusText(paperStatus)}
                </Badge>
              </div>

              {paperStatus === "REVISION_REQUESTED" && (
                <div className="bg-muted/30 rounded-lg p-4 border border-muted-foreground/20">
                  <RevisionUpload 
                    userId={user.id}
                    presenters={presenters}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm transition-all hover:shadow-md">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-semibold">Registration Information</CardTitle>
            <CardDescription>Session and payment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 pb-2 border-b">
                <Calendar className="h-5 w-5 text-primary/70" />
                <span className="font-medium">Session Type</span>
              </div>
              <p className="text-sm pl-8 text-muted-foreground">
                {registration.sessionType === "ONLINE" ? "Online" : "Offline"}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 pb-2 border-b">
                <Building className="h-5 w-5 text-primary/70" />
                <span className="font-medium">Registration Type</span>
              </div>
              <p className="text-sm pl-8 text-muted-foreground">
                {registration.registrationType.replace(/_/g, " ")}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 pb-2 border-b">
                <Clock className="h-5 w-5 text-primary/70" />
                <span className="font-medium">Payment Status</span>
              </div>
              <div className="pl-8 flex gap-2">
                <Badge variant="outline" className={`${getPaymentStatusColor(registration.paymentStatus)} px-3 py-1`}>
                  <span className="mr-2">●</span>
                  {registration.paymentStatus === "CONFIRMED" 
                    ? "Confirmed" 
                    : registration.paymentStatus === "REJECTED"
                    ? "Rejected"
                    : "Pending"}
                </Badge>
                {registration.isEarlyBird && (
                  <Badge variant="outline" className="ml-2 text-purple-500 border-purple-200 bg-purple-50 dark:bg-purple-500/10 dark:border-purple-500/20">
                    Early Bird
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
