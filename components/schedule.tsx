"use client"

import { Timeline } from "@/components/ui/timeline"
import { CalendarDays } from "lucide-react"

const scheduleItems = [
  {
    title: "14 Mar - 14 May",
    content: (
      <div className="prose prose-sm dark:prose-invert">
        <div className="space-y-1.5">
          <h3 className="text-base font-medium text-primary">Paper Submission</h3>
          <p className="text-sm text-muted-foreground">Submit your research Paper for initial review. Papers should be 250-300 words outlining your research objectives, methodology, and key findings.</p>
        </div>
      </div>
    ),
  },
  {
    title: "7-14 May 2025",
    content: (
      <div className="prose prose-sm dark:prose-invert">
        <div className="space-y-1.5">
          <h3 className="text-base font-medium text-primary">Payment</h3>
          <p className="text-sm text-muted-foreground">Complete the registration payment to confirm your participation. Different rates apply for online/offline and student/non-student participants.</p>
        </div>
      </div>
    ),
  },
  {
    title: "28 May 2025",
    content: (
      <div className="prose prose-sm dark:prose-invert">
        <div className="space-y-1.5">
          <h3 className="text-base font-medium text-primary">Notification</h3>
          <p className="text-sm text-muted-foreground">Authors will be notified about the acceptance of their Papers. Successful submissions will receive further instructions for full paper preparation.</p>
        </div>
      </div>
    ),
  },
  {
    title: "28 May - 28 June 2025",
    content: (
      <div className="prose prose-sm dark:prose-invert">
        <div className="space-y-1.5">
          <h3 className="text-base font-medium text-primary">Full Paper Revision & Resubmit</h3>
          <p className="text-sm text-muted-foreground">Address reviewer feedback and make necessary improvements to your paper. Ensure all comments are properly addressed before final submission.</p>
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
