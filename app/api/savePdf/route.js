import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/connectDB";
import PdfModel from "@/lib/models/PdfModel";

export async function GET(){
    try {
        await connectDB() ; 
       const session = await getServerSession(authOptions);
               if (!session) {
                   return NextResponse.json({ message: "Unauthorized : No valid Session" }, { status: 401 });
               }
       
    } catch (error) {
         console.log("Error getting pdfs", error.message);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

export async function POST(request){
    try {
        await connectDB() ; 
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized : No valid Session" }, { status: 401 });
        }
        const {id} = await params ; 
        const {pdfName , pdfUrl} = await request.json() ; 
        const newPdf = await PdfModel.create({pdfName , pdfUrl , courseId : id , userId : session.user.id}) ; 
        return NextResponse.json({newPdf : newPdf}, {status: 201}); 
    } catch (error) {
        console.log("Error saving pdf", error.message);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
