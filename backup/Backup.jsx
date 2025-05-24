import mongoose, { Schema } from "mongoose";

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String, 
        enum: ["faible", "moyenne", "élevé"], 
        default : "low" , 
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const Todo = mongoose.models.todo || mongoose.model("todo", TodoSchema);

export default Todo;



import { connectDB } from "@/lib/config/connectDB";
import Todo from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

 async function  connect(){
    await connectDB()
 }
 connect() ; 


export async function GET(){
    try {
        const todos = await Todo.find({}) ; 
        return NextResponse.json({todos: todos}, {status : 200}) ; 
    } catch (error) {
        console.error("Error fetching todos: " , error.message) ; 
        return NextResponse.json({message: "Internal error server"} , {status : 500}) ; 
    }
}
export async function POST(request){
    try {
        const {title , description ,priority, deadline} = await request.json() ; 
        if(!title || !description || !priority || !deadline){
            console.log("Hello Kawou")
            return NextResponse.json({message: "All the fields are required"} , {status : 400})
        }
        const existingTodo = await Todo.findOne({title}) ; 
        if(existingTodo){
            return NextResponse.json({message: "Todo already exist"}, {status: 404}) ; 
        }
        
        const newTodo = await Todo.create({title, description, priority ,  deadline}) ; 
        return NextResponse.json({newTodo : newTodo} , {status : 201}) ; 
    } catch (error) {
        console.error("Error fetching todos: " , error.message) ; 
        return NextResponse.json({message: "Internal error server"}) ; 
    }
}
