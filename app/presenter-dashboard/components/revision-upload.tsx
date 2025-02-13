"use client"

import { FileUpload } from "@/components/ui/file-upload"
import { updatePaper } from "../actions"

interface RevisionUploadProps {
  userId: string
  presenters: {
    id: number
    name: string
    nationality: string
    comment?: string | null
    presenterRegistrationId: number
    order: number
  }[]
}

export function RevisionUpload({ userId, presenters }: RevisionUploadProps) {
  return (
    <>
      <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/50 p-4 rounded-lg">
        <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Reviewer Comments</h4>
        {presenters.map((presenter) => (
          presenter.comment && (
            <p key={presenter.id} className="text-sm text-yellow-700 dark:text-yellow-300">
              {presenter.comment}
            </p>
          )
        ))}
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Upload Revised Paper</h4>
        <FileUpload 
          onChange={async (downloadURL) => {
            const result = await updatePaper(userId, downloadURL);
            if (!result.success) {
              console.error("Failed to update paper:", result.error);
            }
          }} 
        />
      </div>
    </>
  )
}
