import { db } from "@/lib/db";
import { PaymentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { registrationId, paymentStatus } = await request.json();

    if (!registrationId || !paymentStatus) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const registration = await db.registration.update({
      where: { id: registrationId },
      data: { paymentStatus: paymentStatus as PaymentStatus },
    });

    revalidatePath("/dashboard");

    return NextResponse.json({ success: true, data: registration });
  } catch (error: any) {
    console.error("Failed to update payment status:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
