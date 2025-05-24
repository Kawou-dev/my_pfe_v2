//api/urgentTodo/route.js
import { connectDB } from "@/lib/config/connectDB";
import Todo from "@/lib/models/TodoModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(){
    try {
        await connectDB() ; 
        const session = await getServerSession(authOptions) ; 
        if(!session){
            return NextResponse.json({message : "Unauthorized: No session Valid"} , {status : 401}) ;
        }
        const urgsTodo = await Todo.find({ userId : session.user.id , priority: "élevé"}) ;
        return NextResponse.json({urgsTodo}) ; 
    } catch (error) {
        console.error(error.message) ; 
        return NextResponse.json({message : "Internal Error Server"} , {status : 500}) ;
    }
}



export async function DELETE(request){
    try {
        await connectDB() ;
        const session = await getServerSession(authOptions) ; 
        if(!session){
            return NextResponse.json({message : "Unauthorized: No session Valid"} , {status : 401}) ;
        }
        const {id} = await request.json()  ;  
        // console.log(id)  ;
        const deletedTodo = await Todo.findByIdAndDelete({ _id: id , userId : session.user.id  })
        // console.log(deletedTodo)  ;
        return NextResponse.json({deletedTodo} , {status : 200})
    } catch (error) {
        console.error(error.message) ; 
        return NextResponse.json({message : "Internal Error Server"} , {status : 500}) ;
        
    }
}