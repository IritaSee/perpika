"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function updatePaper(presenterId: string, newPaperUrl: string) {
  try {
    const presenterRegistration = await db.presenterRegistration.findFirst({
      where: {
        userId: presenterId,
      },
    })

    if (!presenterRegistration) {
      throw new Error("Presenter registration not found")
    }

    await db.presenterRegistration.update({
      where: {
        id: presenterRegistration.id,
      },
      data: {
        PaperSubmission: newPaperUrl,
        paperStatus: "UNDER_REVIEW", // Reset to under review after new submission
      },
    })

    revalidatePath("/presenter-dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error updating paper:", error)
    return { success: false, error: "Failed to update paper" }
  }
}
