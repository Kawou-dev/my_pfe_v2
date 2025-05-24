import { connectDB } from "@/lib/config/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import NextVacanceModel from "@/lib/models/NextVacanceModel";

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


export async function POST(request){
    try {
         await connectDB() ; 
        const session = await getServerSession(authOptions) ; 
        if(!session) {
            return NextResponse.json({message: "Unauthorized: No session Valid"} , {status: 401}) ; 
        }

        const {cityName , prevDate  , priority} = await request.json( ) ; 

        const newNextVacance = await NextVacanceModel.create( {cityName , prevDate , priority , userId : session.user.id} ) ; 
        return NextResponse.json({newNextVacance} , {status : 201}) ; 
    } catch (error) {
         console.error("Error while posting the next vacance" , error.message)  ; 
        return NextResponse.json({message : "Internal Error Server"} , {status : 500}) ; 
    }
}


export async function DELETE(request){
    try {
        await connectDB() ; 
        const session = await getServerSession(authOptions) ;
        if(!session) return NextResponse.json({message : "Unauthorized: No session valid"}, {status : 401}) 

        const {NextVacId} = await request.json() ; 
        if(!NextVacId) {
            console.error("Error : NextVacId is missing") ; 
            return NextResponse.json({message : "NextVacId missing !"} , {status : 400})
        }
        const NextVacIdDelete = await NextVacanceModel.findByIdAndDelete(NextVacId) ; 

        return NextResponse.json({NextVacIdDelete} , {status : 200})  ;
       
    } catch (error) {
        console.error("Error while deleting next vacance :" , error.message) ; 
        return NextResponse.json({message : "Internal error server"} , {status : 500});
    }
}