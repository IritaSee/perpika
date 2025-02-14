import { db } from "@/lib/db";
import { PaperStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { id, paperStatus } = await request.json();

    if (!id || !paperStatus) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const presenterReg = await db.presenterRegistration.update({
      where: { id },
      data: { paperStatus: paperStatus as PaperStatus },
    });

    revalidatePath("/dashboard");

    return NextResponse.json({ success: true, data: presenterReg });
  } catch (error: any) {
    console.error("Failed to update paper status:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
