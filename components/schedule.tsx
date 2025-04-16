"use client"

import { Timeline } from "@/components/ui/timeline"
import { CalendarDays } from "lucide-react"

const scheduleItems = [
  {
    title: "14 March – 14 May 2025",
    content: (
      <div className="prose prose-sm dark:prose-invert">
        <div className="space-y-1.5">
          <h3 className="text-base font-medium text-primary">Paper Submission & Payment</h3>
          <p className="text-sm text-muted-foreground">Submit your research paper and complete the registration payment. Different rates apply for online/offline and student/non-student participants.</p>
        </div>
      </div>
    ),
  },
  {
    title: "28 May 2025",
    content: (
      <div className="prose prose-sm dark:prose-invert">
        <div className="space-y-1.5">
          <h3 className="text-base font-medium text-primary">Notification of Submission</h3>
          <p className="text-sm text-muted-foreground">Authors will be notified about the acceptance of their papers and receive further instructions for full paper preparation.</p>
        </div>
      </div>
    ),
  },
  {
    title: "28 May – 28 Jun 2025",
    content: (
      <div className="prose prose-sm dark:prose-invert">
        <div className="space-y-1.5">
          <h3 className="text-base font-medium text-primary">Full Paper Revision & Submission</h3>
          <p className="text-sm text-muted-foreground">Address reviewer feedback and submit your revised full paper. Ensure all comments are properly addressed before final submission.</p>
        </div>
      </div>
    ),
  },
]

const Schedule = () => {
  return (
    <Timeline 
      items={scheduleItems}
    />
  )
}

export default Schedule
