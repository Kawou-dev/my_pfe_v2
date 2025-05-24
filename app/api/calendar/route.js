import { connectDB } from "@/lib/config/connectDB";
import CalendarModel from "@/lib/models/CalendarModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";


export async function GET() {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const events = await CalendarModel.find({ userId : session.user.id }) ; 
        // console.log(events) ; 
        return NextResponse.json({events}, {status : 200})
    } catch (error) {
        console.error(error.message) ; 
        return NextResponse.json({message : "Internal Error server"}, {status : 500}) ; 
    }
}

export async function POST(request){
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {eventName, eventDate} = await request.json() ; 
        if(!eventName || !eventDate ) {
            return NextResponse.json({message : "Please enter the event name and the Click on the date "}, {status : 400})
        }


        console.log(eventName , eventDate) ; 
        const newEvent = await CalendarModel.create({eventName , eventDate , userId : session.user.id}) ;
        return NextResponse.json({newEvent} , {status: 201})
    } catch (error) {
        console.error(error.message) ; 
        return NextResponse.json({message : "Internal Error server"}, {status : 500}) ; 
    }
}

export async function DELETE(request){
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const {id} = await request.json() ; 
        // console.log(id) ; 
        // if(!id) return NextResponse.json({message: "No id provided "}, {status: 400}) ; 

        const eventDeleted = await CalendarModel.findByIdAndDelete(id) ; 
        // console.log(eventDeleted) ; 
        return NextResponse.json({message : "Event deleted successfully: ", eventDeleted },{status : 200} ) ; 


    }catch(error){
        console.error("Error deleting the event: ", error.message);
        return NextResponse.json({ message: "Internal Error server" }, { status: 500 });

    }

}