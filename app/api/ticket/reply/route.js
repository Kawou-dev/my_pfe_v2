//  admin : ticket à repondre et recevoir
import { connectDB } from "@/lib/config/connectDB";
import TicketModel from "@/lib/models/TicketModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    const tickets = await TicketModel.find({}); 
    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}




export async function POST(request) {
  try {
    await connectDB() ; 
    const session = await getServerSession(authOptions) ; 
    if(!session || !session.user?.isAdmin) 
      return NextResponse.json({message : "Unauthorized: No session valid"}, {status : 401}) ; 
  
    const { ticketId, response } = await request.json();
    const ticket = await TicketModel.findById(ticketId);
    if (!ticket) {
      return NextResponse.json({ error: "Ticket non trouvé" }, { status: 404 });
    }

    ticket.response = response;
    ticket.status = true;
    await ticket.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error while replying: " , error.message) ; 
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}






// export async function POST(request) {
//   try {
//     await connectDB() ; 
//     const session = await getServerSession(authOptions) ; 
//     if(!session || !session.user?.isAdmin) 
//       return NextResponse.json({message : "Unauthorized: No session valid"}, {status : 401}) ; 
  
//     const { ticketId, response } = await request.json();
//     const ticket = await TicketModel.findById(ticketId);
//     if (!ticket) {
//       return NextResponse.json({ error: "Ticket non trouvé" }, { status: 404 });
//     }

//     ticket.response = response;
//     ticket.status = "répondu";
//     await ticket.save();

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error while replying: " , error.message) ; 
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }
