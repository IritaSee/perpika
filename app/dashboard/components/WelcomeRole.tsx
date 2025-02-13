"use client"

import { Card } from "@/components/ui/card"

interface WelcomeRoleProps {
  role: string
}

export function WelcomeRole({ role }: WelcomeRoleProps) {
  return (
    <Card className="p-4 mb-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <h2 className="text-xl font-semibold">
        Welcome, you are logged in as{" "}
        <span className={`
          ${role === 'ADMIN' && 'text-red-500'}
          ${role === 'PRESENTER' && 'text-blue-500'}
          ${role === 'REVIEWER' && 'text-green-500'}
        `}>
          {role}
        </span>
      </h2>
    </Card>
  )
}
