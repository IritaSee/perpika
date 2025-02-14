import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { presenterId, comment } = await request.json();

    if (!presenterId) {
      return NextResponse.json(
        { success: false, error: "Missing presenter ID" },
        { status: 400 }
      );
    }

    const presenter = await db.presenter.update({
      where: { id: presenterId },
      data: { comment },
    });

    revalidatePath("/dashboard");

    return NextResponse.json({ success: true, data: presenter });
  } catch (error: any) {
    console.error("Failed to update presenter comment:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
