import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { connectDB } from "@/lib/config/connectDB";
import Todo from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";


async function connect(){
  await connectDB() ; 
}
connect()  ; 

export async function GET() {
    try {
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ message: "Unauthorized : No session valid" }, { status: 401 });
      }
      const todos = await Todo.find({ userId: session.user.id }); 
      return NextResponse.json({ todos } , {status : 200});
    } catch (error) {
          console.error("Error fetching todos :" , error.message) ; 
          return NextResponse.json({message : "Internal error server"} , {status : 500}) ; 
    }
     
}

export async function POST(request) {
      try {
        const session = await getServerSession(authOptions);
        if (!session) {
          return NextResponse.json({ message: "Unauthorized : No session valid" }, { status: 401 });
        }
          const { title, description, priority, deadline } = await request.json();
          if (!title || !description || !priority || !deadline) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
          }      
            const newTodo = await Todo.create({
              title,
              description,
              priority,
              deadline,
              userId: session.user.id, 
            });
            return NextResponse.json({ newTodo }, { status: 201 });
      } catch (error) {
        console.error("Error posting todo :" , error.message) ; 
        return NextResponse.json({message : "Internal error server"} , {status : 500}) ;         
      }
   
  }

