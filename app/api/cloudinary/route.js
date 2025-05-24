//app/api/cloudinary/route.js


import cloudinary from "cloudinary";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import PdfModel from "@/lib/models/PdfModel";
import { connectDB } from "@/lib/config/connectDB";


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
  
      const { publicId } = await request.json();
      if (!publicId) {
        return NextResponse.json({ message: "Public ID is required" }, { status: 400 });
      }
  
      const pdf = await PdfModel.findOne({ publicId });
      if (!pdf) {
        return NextResponse.json({ message: "PDF not found" }, { status: 404 });
      }
  
      // Vérifie que le user connecté est bien le propriétaire
      if (pdf.userId.toString() !== session.user.id) {
        return NextResponse.json({ message: "Not allowed to delete this file" }, { status: 403 });
      }
  
      // Supprimer sur Cloudinary
      await cloudinary.v2.uploader.destroy(publicId, { resource_type: "raw" });
  
      // Supprimer dans MongoDB
    const deletedPdf =  await PdfModel.findByIdAndDelete(pdf._id);
  
      return NextResponse.json({ message: "PDF deleted successfully" , deletedPdf}, { status: 200 });
  
    } catch (error) {
      console.error("Delete error:", error.message);
      return NextResponse.json({ message: "Internal Server error" }, { status: 500 });
    }
  }



  