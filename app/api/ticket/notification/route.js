import { connectDB } from "@/lib/config/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route";
import TicketModel from "@/lib/models/TicketModel";

export async function GET(){

    try {
        await connectDB() ; 
        const session = await getServerSession(authOptions) ; 
        if(!session) return NextResponse.json({message : "Unauthorized: No session valid"}, {status : 401} ) ; 

        const ticketNotifiy = await TicketModel.find({userId: session.user.id , status: true  ,   isSeenByUser : false   }) ; 
        const nbreTicketNotifiy = await TicketModel.countDocuments({userId: session.user.id , status: true  ,   isSeenByUser : false   }) ; 
        console.log("Nbre de ticket:" ,   nbreTicketNotifiy) ; 
        return NextResponse.json({nbreTicketNotifiy}, {status : 200}) ; 
        
    } catch (error) {
        console.log("Error getting the unread messages: ", error.message )
        return NextResponse.json({message : "Internal error server"}, {status : 500}) ;
    } 

}


export async function PUT(){
    try {
        await connectDB() ; 
        const session = await getServerSession(authOptions) ; 
        if(!session) return NextResponse.json({message : "Unauthorized: No session valid"}, {status : 401} ) ; 

        const markAsSeen = await TicketModel.updateMany({
            userId : session.user.id , status : true , isSeenByUser : false },  { $set: { isSeenByUser: true } }
        )

        return NextResponse.json({markAsSeen}, {status : 200}) ; 

    } catch (error) {
        console.log("Error marking seen the unread messages: ", error.message )
        return NextResponse.json({message : "Internal error server"}, {status : 500}) ;
  
    }
}