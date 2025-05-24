import { connectDB } from "@/lib/config/connectDB";
import LimiteModel from "@/lib/models/LimiteRate";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {

        await connectDB() ; 
         const startOfDay = new Date() ; 

         startOfDay.setHours(0 , 0 , 0 , 0)  ;
         const nbreRequest = await LimiteModel.countDocuments({createdAt :  { $gte:  startOfDay } }) ; 

         const nbreLimite = parseInt(process.env.test, 10);
         if(isNaN(nbreLimite)){
            console.log("ce n'est pas un nombre")
         }

         if(nbreRequest >= nbreLimite ){
            return NextResponse.json({message: "Come back tomorrow"}, {status : 429})  ; 
         }

         const {prompt} = await request.json() ; 

         const pr = await LimiteModel.create({prompt}) ; 
         return NextResponse.json({pr}, {status: 201}) ; 



    } catch (error) {
        console.error("Error", error.message);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
