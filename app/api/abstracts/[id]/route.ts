import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const presenterRegistration = await db.presenterRegistration.findUnique({
      where: { id },
    });

    if (!presenterRegistration) {
      return new NextResponse("Presenter registration not found", { status: 404 });
    }

    if (!presenterRegistration.abstractSubmission) {
      return new NextResponse("Abstract not submitted", { status: 404 });
    }

    const response = await fetch(presenterRegistration.abstractSubmission);

    if (!response.ok) {
      return new NextResponse('Failed to fetch abstract from Firebase Storage', { status: response.status });
    }

    const fileBuffer = await response.arrayBuffer();

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${presenterRegistration.presentationTitle}.pdf"`
      }
    });


  } catch (error) {
    console.error("Error fetching abstract:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
