import { connectDB } from "@/lib/config/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import RatingModel from "@/lib/models/RatingModel";

export async function POST(request){
    try {
        await connectDB() ;  
         const session = await getServerSession(authOptions);
         if (!session) {
              return NextResponse.json({ message: "Unauthorized: No session valid" }, { status: 401 });
         }
         const  {rating} = await request.json() ; 

         const newRating = await RatingModel.create({rating , userId : session.user.id}) ;

         return NextResponse.json({newRating} , {status: 201}) ; 
    } catch (error) {
        console.log("Error while rating app:" , error.message) ; 
        return NextResponse.json({message: "Probleme de connexion: Veuillez verfiez votre internet"}) ; 
    }
}