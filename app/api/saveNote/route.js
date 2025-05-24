import { connectDB } from "@/lib/config/connectDB";
import NoteModel from "@/lib/models/NoteModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";



export async function GET() {
    try {
        await connectDB() ; 
        const session = await getServerSession(authOptions) ; 
        if(!session){
            return NextResponse.json({message : "Unauthorize"} , {status : 401}) ; 
        }
         const notes = await NoteModel.findOne({userId : session.user.id})
        return NextResponse.json({notes: notes}, {status : 200}) ;  
    } catch (error) {
        console.error("Erreur getting notes: " , error.message) ; 
        return NextResponse.json({message : "Internal server error or no internet connection"}) ; 
    }
}

export async function POST(request) {
    // try {
    //     await connectDB() ; 
    //     const session = await getServerSession(authOptions) ; 
    //     if(!session){
    //         return NextResponse.json({message : "Unauthorize"} , {status : 401}) ; 
    //     }
    //       const {note} = await request.json() ; 
    //       if(!note){
    //         return NextResponse.json({message : "Note is mandatory"}, {status : 404}) ; 
    //       }
    //       const newNote= await  NoteModel.create({note , userId : session.user.id})
    //       return NextResponse.json({newNote : newNote } , {status : 201}) ; 
    // } catch (error) {
    //     console.error("Erreur posting note: " , error.message) ; 
    //     return NextResponse.json({message : "Internal server error or no internet connection"}) ; 
    // }

    try {
        await connectDB() ; 
        const session = await getServerSession(authOptions) ; 
        if(!session){
            return NextResponse.json({message : "Unauthorize"} , {status : 401}) ; 
        }
        const {note , courseId } = await request.json() ; 
        if(!note || courseId){
            return NextResponse.json({message: "All field are required"}, {status : 404}) ; 
        }

        const newNote = await NoteModel.create({note , courseId , userId : session.user.id}) ; 
        return NextResponse.json({newNote: newNote}, {status : 201}) ; 

    } catch (error) {
        console.error("Erreur posting note: " , error.message) ; 
        return NextResponse.json({message : "Internal server error or no internet connection"}) ; 
  
    }
}