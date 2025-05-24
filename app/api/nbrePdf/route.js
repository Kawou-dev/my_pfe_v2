// api/nbrePdf/route.js
import { connectDB } from "@/lib/config/connectDB";
import PdfModel from "@/lib/models/PdfModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = await request.json();

    const pdfsCours = await PdfModel.find({
      courseId,
      userId: session.user.id,
    });

    if (!pdfsCours || pdfsCours.length === 0) {
      return NextResponse.json({ total: 0, done: 0 }, { status: 200 });
    }

    const total = pdfsCours.length;
    const done = pdfsCours.filter((pdf) => pdf.isCompleted === true).length;

    return NextResponse.json({ total, done }, { status: 200 });

  } catch (error) {
    console.error("Error catching the PDF searched:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
