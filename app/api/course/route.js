
// api/course

// endpoint pour ajouter un cours et get all cours specifique à un user ;
import cloudinary from "cloudinary";
import { connectDB } from "@/lib/config/connectDB";
import CourseModel from "@/lib/models/CourseModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import PdfModel from "@/lib/models/PdfModel";
import NoteModel from "@/lib/models/NoteModel";



export async function GET(){
    try {
        await connectDB()  ;
        const session = await getServerSession(authOptions) ; 
         if(!session){
            return NextResponse.json({message : "Unauthorized"} , {status : 401}) ; 
         }
        const courses = await CourseModel.find({userId : session.user.id}) ; 
        return NextResponse.json({courses} , {status : 200}) ; 
    } catch (error) {
        console.log("Error fetching courses : " , error.message) ; 
        return NextResponse.json({message: "Internal error "} , {status : 500}) ; 
    }
}

export async function POST(request){
    try {
        await connectDB() ; 
        const session = await getServerSession(authOptions) ; 
        if(!session){
           return NextResponse.json({message : "Unauthorized"} , {status : 401}) ; 
        }
        const {title, notes} = await request.json() ; 
        if(!title){
            return NextResponse.json({message : "Title are required"} , {status: 404}) ; 
        }
        const newCourse = await CourseModel.create({title , notes , userId : session.user.id}) ; 
        return NextResponse.json({newCourse} , {status : 201}) ; 
    } catch (error) {
        console.log("Error posting course : " , error.message) ; 
        return NextResponse.json({message: "Internal error "} , {status : 500}) ; 
    }
}

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


export async function DELETE(request) {
    try {
      await connectDB();
      const session = await getServerSession(authOptions);
      
      if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
  
      const { courseId } = await request.json();
      console.log("Deleting course with ID:", courseId);
  
      // Trouver tous les PDFs du cours avant de les supprimer
      const pdfsCours = await PdfModel.find({ courseId, userId: session.user.id });
  
      // Supprimer les fichiers de Cloudinary
      for (const pdf of pdfsCours) {
        if (pdf.publicId) {
          await cloudinary.v2.uploader.destroy(pdf.publicId, { resource_type: "raw" });
        }
      }
  
      // Supprimer les PDFs et les notes de la base de données
      await PdfModel.deleteMany({ courseId, userId: session.user.id });
      await NoteModel.deleteMany({ courseId, userId: session.user.id });
      await CourseModel.findByIdAndDelete(courseId) ; 
  
      console.log("PDFs supprimés :", pdfsCours);
  
      return NextResponse.json({ message: "All deleted successfully" }, { status: 200 });
  
    } catch (error) {
      console.error("Error deleting course and its PDFs:", error.message);
      return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
  }
  