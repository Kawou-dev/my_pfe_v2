import { connectDB } from "@/lib/config/connectDB";
import UserModel from "@/lib/models/UserModel";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await connectDB() ; 
        const users = await UserModel.find({}) ; 
        return NextResponse.json({users}) ; 
    } catch (error) {
        return NextResponse.json({message : "Error"} ) ; 
    }
}