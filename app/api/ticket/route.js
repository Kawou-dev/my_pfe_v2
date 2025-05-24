//  user : pour recevoir ou envoyer son ticket (specifique user)
import { connectDB } from "@/lib/config/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import TicketModel from "@/lib/models/TicketModel";




export async function GET() {
    try {
      await connectDB()  ; 
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ message: "Unauthorized : No session valid" }, { status: 401 });
      }
      const tickets = await TicketModel.find({userId : session.user.id}) ; 
      return NextResponse.json({tickets} , {status : 200}) ; 
    } catch (error) {
      console.error("Error while getting Tickets :" , error.message) ; 
      return NextResponse.json({message : "Internal error server"} , {status : 500}) ;         
    
    }
}


export async function POST(request) {
      try {
        await connectDB() ; 
        const session = await getServerSession(authOptions);
        if (!session) {
          return NextResponse.json({ message: "Unauthorized : No session valid" }, { status: 401 });
        }
          const { email ,  content  } = await request.json();
          if (!email || !content) {
            return NextResponse.json({ message: " Fields are required" }, { status: 400 });
          }      
          const newTicket = await TicketModel.create({email, content , userId : session.user.id}) ; 
         return NextResponse.json({ newTicket }, { status: 201 });
      } catch (error) {
        console.error("Error while sending a Ticket :" , error.message) ; 
        return NextResponse.json({message : "Internal error server"} , {status : 500}) ;         
      } 
  }

