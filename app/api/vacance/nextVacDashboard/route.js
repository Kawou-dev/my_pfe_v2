import { connectDB } from "@/lib/config/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import NextVacanceModel from "@/lib/models/NextVacanceModel";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await connectDB() ; 
        const session = await getServerSession(authOptions) ; 
        if(!session) {
            return NextResponse.json({message: "Unauthorized: No session Valid"} , {status: 401}) ; 
        }

        const nextVacances = await NextVacanceModel.find({userId : session.user.id}).limit(4) ; 
        return NextResponse.json({nextVacances}, {status: 200}) ; 
    } catch (error) {
        console.error("Error while getting the next vacances" , error.message)  ; 
        return NextResponse.json({message : "Internal Error Server"} , {status : 500}) ; 
    }
}