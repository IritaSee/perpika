import { Card } from "@/components/ui/card"
import { Toaster } from "sonner"
import { db } from "@/lib/db"
import { CreateEarlyBirdForm } from "./create-early-bird-form"

async function getEarlyBirdStats() {
  const [totalRegistrations, earlyBirdRegistrations, currentPeriod] = await Promise.all([
    db.registration.count(),
    db.registration.count({
      where: { isEarlyBird: true }
    }),
    db.earlyBirdPeriod.findFirst({
      where: { isActive: true },
      orderBy: { endDate: 'desc' }
    })
  ]);

  return {
    total: totalRegistrations,
    earlyBird: earlyBirdRegistrations,
    percentage: totalRegistrations > 0 
      ? ((earlyBirdRegistrations / totalRegistrations) * 100).toFixed(1)
      : 0,
    currentPeriod
  };
}

export default async function EarlyBirdPage() {
  const stats = await getEarlyBirdStats();

  return (
    <>
      <Toaster />
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Early Bird Management</h1>
          <p className="text-muted-foreground">
            Manage early bird registration periods and view statistics
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Total Registrations</h3>
            <p className="text-3xl font-bold">{stats.total}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Early Bird Registrations</h3>
            <p className="text-3xl font-bold">{stats.earlyBird}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Early Bird Percentage</h3>
            <p className="text-3xl font-bold">{stats.percentage}%</p>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Current Early Bird Period</h2>
            {stats.currentPeriod ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">
                    {new Date(stats.currentPeriod.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-medium">
                    {new Date(stats.currentPeriod.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${stats.currentPeriod.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm">
                    {stats.currentPeriod.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No active early bird period</p>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Create New Early Bird Period</h2>
            <CreateEarlyBirdForm />
          </Card>
        </div>
      </div>
    </>
  )
}
