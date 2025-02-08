"use client"

import { Timeline } from "@/components/ui/timeline"
import { CalendarDays } from "lucide-react"

const scheduleItems = [
  {
    title: "Feb - May 2025",
    content: (
      <div className="prose prose-sm dark:prose-invert">
        <div className="space-y-1.5">
          <h3 className="text-base font-medium text-primary">Abstract Submission</h3>
          <p className="text-sm text-muted-foreground">Submit your research abstract for initial review. Abstracts should be 250-300 words outlining your research objectives, methodology, and key findings.</p>
        </div>
      </div>
    ),
  },
  {
    title: "7 May 2025",
    content: (
      <div className="prose prose-sm dark:prose-invert">
        <div className="space-y-1.5">
          <h3 className="text-base font-medium text-primary">Notification of Submission</h3>
          <p className="text-sm text-muted-foreground">Authors will be notified about the acceptance of their abstracts. Successful submissions will receive further instructions for full paper preparation.</p>
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
    title: "8-28 May 2025",
    content: (
      <div className="prose prose-sm dark:prose-invert">
        <div className="space-y-1.5">
          <h3 className="text-base font-medium text-primary">Full Paper Submission</h3>
          <p className="text-sm text-muted-foreground">Submit your complete research paper following the provided template and guidelines. Papers should be 6-8 pages in length.</p>
        </div>
      </div>
    ),
  },
  {
    title: "May - Jun 2025",
    content: (
      <div className="prose prose-sm dark:prose-invert">
        <div className="space-y-1.5">
          <h3 className="text-base font-medium text-primary">Full Paper Revision</h3>
          <p className="text-sm text-muted-foreground">Address reviewer feedback and make necessary improvements to your paper. Ensure all comments are properly addressed before final submission.</p>
        </div>
      </div>
    ),
  },
  {
    title: "11-20 Jun 2025",
    content: (
      <div className="prose prose-sm dark:prose-invert">
        <div className="space-y-1.5">
          <h3 className="text-base font-medium text-primary">Final Paper Submission</h3>
          <p className="text-sm text-muted-foreground">Submit the final version of your paper incorporating all revisions. This version will be included in the conference proceedings.</p>
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
