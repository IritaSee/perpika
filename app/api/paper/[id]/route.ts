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

    if (!presenterRegistration.PaperSubmission) {
      return new NextResponse("Paper not submitted", { status: 404 });
    }

    const response = await fetch(presenterRegistration.PaperSubmission);

    if (!response.ok) {
      return new NextResponse('Failed to fetch Paper from Firebase Storage', { status: response.status });
    }

    const fileBuffer = await response.arrayBuffer();

    const searchParams = request.nextUrl.searchParams;
    const download = searchParams.get('download') === 'true';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': download 
          ? `attachment; filename="${presenterRegistration.presentationTitle}.pdf"`
          : `inline; filename="${presenterRegistration.presentationTitle}.pdf"`
      }
    });


  } catch (error) {
    console.error("Error fetching Paper:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
