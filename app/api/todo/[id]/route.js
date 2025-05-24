import { connectDB } from "@/lib/config/connectDB";
import Todo from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";

 async function  connect(){
    await connectDB()
 }
 connect() ; 


 export async function PUT(request , {params}){
   try {
      const {id} = await params ; 
      const existingTodo = await Todo.findById(id) ; 
      if(!existingTodo){
         return NextResponse.json({message: "Todo does not exist"} , {status : 404})  ; 
      }
      const {title , description , isCompleted, priority , deadline} = existingTodo ; 
      const updatedTodo = await Todo.findByIdAndUpdate(id, {
         $set : {  isCompleted : !isCompleted   }
      })
      return NextResponse.json({message : updatedTodo}, {status: 200}) ; 
   } catch (error) {
      console.error("Error fetching todos: " , error.message) ; 
      return NextResponse.json({message: "Internal error server"}, {status : 500}) ;      
   }
 }


 export async function PATCH(request, {params}){
   try {
      const {id} = await params ; 
      const body = await request.json() ; 
      const {title} = body ; 
      const existingTodo = await Todo.findById(id) ; 
      if(!existingTodo){
         return NextResponse.json({message: "Todo does not exist"} , {status : 404})  ; 
      }
      // const existingTodo2 = await Todo.findOne({title})
      // if(existingTodo2){
      //    return NextResponse.json({message: "Todo title already exist"} , {status : 404})  ; 
      // }
      const updatedTodo = await Todo.findByIdAndUpdate(id , {...body}) ; 
      return NextResponse.json({updatedTodo: updatedTodo}, {status: 200}) ; 

   } catch (error) {
      console.error("Error fetching todos: " , error.message) ; 
      return NextResponse.json({message: "Internal error server"}, {status : 500}) ; 
   }
 }

export async function DELETE(request , {params}){
   try {
      const {id} = await params ; 
      const existingTodo = await Todo.findById(id) ; 
      if(!existingTodo){
         return NextResponse.json({message: "Todo does not exist"} , {status : 404})  ; 
      }
      const deletedTodo = await Todo.findByIdAndDelete(id) ; 
      return NextResponse.json({deletedTodo : deletedTodo} , {status:200})
      
   } catch (error) {
      console.error("Error fetching todos: " , error.message) ; 
      return NextResponse.json({message: "Internal error server"}, {status : 500}) ; 
   }
}