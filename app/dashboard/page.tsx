import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { LogoutButton } from "@/components/auth/logout-button"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            Selamat datang, {session.user?.email}!
          </p>
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
