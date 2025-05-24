import { connectDB } from "@/lib/config/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import CalendarModel from "@/lib/models/CalendarModel";

export async function GET() {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const events = await CalendarModel.find({  userId: session.user.id, eventDate: { $gte: new Date() }  
        }).sort({ eventDate: 1 }).limit(5); 
        // console.log(events) ; 
        return NextResponse.json({ events }, { status: 200 });
    } catch (error) {
        console.error("Error getting upcoming events: ", error.message);
        return NextResponse.json({ message: "Internal Error server" }, { status: 500 });
    }
}


