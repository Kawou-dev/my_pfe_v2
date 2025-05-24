// api/course/[id]/route.js

// endpoint to get details specific cours {note , pdf}

import { connectDB } from "@/lib/config/connectDB";
import CourseModel from "@/lib/models/CourseModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions) ;
  
    if(!session){
      return NextResponse.json({message : "Unauthorized "} , {status : 401}) ; 
    }
    const { id } = await params;
   
    const courseById = await CourseModel.findOne({ userId: session.user.id, _id: id }); 

    if (!courseById) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({courseById} , {status: 200}); 
  } catch (error) {
    console.error("Error fetching course:", error.message);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
