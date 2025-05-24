import { connectDB } from "@/lib/config/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import TicketModel from "@/lib/models/TicketModel";


export async function GET() {
    try {
      await connectDB();
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ message: "Unauthorized : No Session valid" }, { status: 401 });
      }
  
      const tickets = await TicketModel.find({ userId: session.user.id }).sort({ createdAt: -1 });
  
      return NextResponse.json({ tickets }, { status: 200 });
    } catch (error) {
      console.error("Error while getting Ticket responses:", error.message);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }
  

