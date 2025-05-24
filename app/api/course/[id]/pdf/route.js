// app/api/course/[id]/pdf/route.js

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/config/connectDB";
import PdfModel from "@/lib/models/PdfModel";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    try {
        await connectDB() ; 
        const session = await getServerSession(authOptions);
         if (!session) {
            return NextResponse.json({ message: "Unauthorized : No valid Session" }, { status: 401 });
        } 
        const { id } =  await params;
        const pdf = await PdfModel.find({ courseId: id, userId: session.user.id, });
        // console.log(pdf) ; 
        if(!pdf) {
            return NextResponse.json({message: "No pdf found"}, {status : 404}) ; 
        }
        return NextResponse.json({pdf: pdf} , {status: 200}) ; 
    } catch (error) {
         console.log("Error fetching pdfs", error.message);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
         
    }
    
}


export async function POST(request, {params}) {
    try {
        await connectDB() ; 
        const session = await getServerSession(authOptions);
         if (!session) {
            return NextResponse.json({ message: "Unauthorized : No valid Session" }, { status: 401 });
        } 
        const { id } =  await params;
        const {pdfName , pdfUrl , publicId } = await request.json() ; 
        if(!pdfName || !pdfUrl || !publicId){ 
            return NextResponse.json({message: "Generer the pdf first"}, {status : 400}) ;
         }
        const newPdf = await PdfModel.create({pdfName, pdfUrl, publicId , courseId : id , userId : session.user.id}) ; 
        // console.log("Endopoint save pdf ", newPdf) ; 
        return NextResponse.json({newPdf : newPdf} , {status : 201}) ; 
    } catch (error) {
        console.error("Erreur saving pdf :", error.message);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
           
    }
    
}

// export async function PUT(request, { params }) {
//   try {
//     await connectDB() ; 
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ message: "Unauthorized: No session valid" }, { status: 401 });
//     }

//     const { id: pdfIdFromFrontend } = await request.json(); // <-- id du document (PDF)
//     const { id: courseIdFromParams } = await params; // <-- id du cours (route /api/course/:id/pdf)

//     console.log("📦 pdfIdFromFrontend (Mongo _id):", pdfIdFromFrontend);
//     console.log("📚 courseIdFromParams (courseId):", courseIdFromParams);

//     // Vérification du PDF spécifique
//     const existingPdf = await PdfModel.findOne({
//       _id: pdfIdFromFrontend,
//       courseId: courseIdFromParams,
//       userId: session.user.id,
//     });

//     if (!existingPdf) {
//       return NextResponse.json({ message: "PDF not found" }, { status: 404 });
//     }

//     const updatedPdf = await PdfModel.findOneAndUpdate(
//       { _id: pdfIdFromFrontend },
//       { $set: { isCompleted: !existingPdf.isCompleted } },
//       { new: true }
//     );

//     return NextResponse.json({ updatedPdf });
//   } catch (error) {
//     console.error(error.message);
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }

export async function PUT(request , {params}){
  try {
      await connectDB() ; 
      const session = await getServerSession(authOptions);
      if (!session) {
         return NextResponse.json({ message: "Unauthorized : No valid Session" }, { status: 401 });
     } 
     const {courseId  , id } = await request.json() ; 
     console.log("------> CourseId:" ,  courseId) ;
     console.log("------> pdfId:" ,  id) ;

     const existingPdf = await PdfModel.findOne({_id : id , courseId : courseId , userId :session.user.id}) ; 
     if(!existingPdf) {
      return NextResponse.json({message : "Pdf not found "} , {status: 404}) ; 
     }
    
    
      const  { isCompleted } = existingPdf ;  
      const updatedPdf = await PdfModel.findOneAndUpdate(
        {_id : id , courseId : courseId , userId :session.user.id} , 
        { $set: { isCompleted: !existingPdf.isCompleted } },
        {new : true} 
      )
      // console.log(updatedPdf) ; 
      return NextResponse.json({updatedPdf}, {status : 200}) ; 
  } catch (error) {
      console.error(error.message)  ; 
      return NextResponse.json({message : "Internal error Server"} , {status : 500}) ; 
  }
}
