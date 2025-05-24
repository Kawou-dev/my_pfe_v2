import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/connectDB";
import Vacances from "@/lib/models/VacanceModel";

export async function GET(){
    try {
        await connectDB() ; 
        const session = await getServerSession(authOptions) ;
        if(!session) return NextResponse.json({message : "Unauthorized: No session valid"}, {status : 401})  
        const favoris = await Vacances.find({userId : session.user.id , favori : true  }).limit(5)
        // console.log(favoris) ; 
        return NextResponse.json({favoris}, {status : 200})
    } catch (error) {
        console.error("Error while getting favori vacance :" , error.message) ; 
        return NextResponse.json({message : "Internal error server"} , {status : 500});      
    }
}