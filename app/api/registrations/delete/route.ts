import { deleteRegistration } from "@/app/dashboard/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const id = formData.get("id");

  if (!id || typeof id !== "string" || isNaN(Number(id))) {
    return NextResponse.json({ success: false, error: "ID tidak valid" }, { status: 400 });
  }

  const result = await deleteRegistration(Number(id));

  if (!result.success) {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
