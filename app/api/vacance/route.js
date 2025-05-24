import { connectDB } from "@/lib/config/connectDB"
import Vacances from "@/lib/models/VacanceModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import cloudinary from "cloudinary"




// const connect = async() => {
//     await connectDB() ; 
// }
// connect() ; 

export async function GET() {
    await connectDB() ; 
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({message : "Unauthorized : No session valid"} , {status : 401}) ; 
        }
        const nbreVacance = await Vacances.countDocuments({userId : session.user.id} ) ; 
        console.log("Nbre vacance --->" , nbreVacance) ; 
         const vacances = await Vacances.find({userId : session.user.id}) ; 
         return NextResponse.json({vacances : vacances} , {status : 200}) ; 
    } catch (error) {
        console.error("Error fetching vacances :" , error.message) ; 
        return NextResponse.json({message : "Internal error server"} , {status : 500}) ; 
    }
}




export async function POST(request){
    await connectDB() ; 
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({message : "Unauthorized : No session valid"} , {status : 401}) ; 
        }

        const LIMITE_RATE = parseInt(process.env.LIMITE_RATE , 10)  ; 
        const nbreVacance = await Vacances.countDocuments({userId : session.user.id} ) ; 
        console.log("Nbre vacance --->" , nbreVacance) ; 

        if(nbreVacance >= LIMITE_RATE) {
            console.log("Limite reached (nbre max = " , nbreVacance ,  ")"   ) ; 
            return NextResponse.json({message: "Limite vac reached"} , {status : 403})  ; 
        }

          const {cityName , experience , images, publicId } = await request.json() ;
          if(!cityName || !experience || !images ||  !publicId ){
              return NextResponse.json({message : "Fieds are required"}, {status : 400}) ; 
          }
          const newVacance = await Vacances.create({cityName , experience , images , publicId ,  userId : session.user.id}) ; 
          return NextResponse.json({newVacance : newVacance} , {status : 201})
   
        } catch (error) {
        console.error("Error while adding vacance :" , error.message) ; 
        return NextResponse.json({message : "Internal error server"} , {status : 500});
    }
}

export async function PUT(request){
    try {
        await connectDB() ; 
        const session = await getServerSession(authOptions) ;
        if(!session) return NextResponse.json({message : "Unauthorized: No session valid"}, {status : 401}) 
        
        const {id} = await request.json() ; 
        const existigVacance = await Vacances.findById(id) ; 
        const { favori   } = existigVacance ; 

        const updatedVacance = await Vacances.findByIdAndUpdate(id , {
            $set : { favori:  !existigVacance.favori   }
        })
        return NextResponse.json({updatedVacance} , {status : 200}) ; 
    } catch (error) {
        console.error("Error while setting vacance :" , error.message) ; 
        return NextResponse.json({message : "Internal error server"} , {status : 500});
    }
}


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


export async function DELETE(request){
    try {
        await connectDB() ; 
        const session = await getServerSession(authOptions) ;
        if(!session) return NextResponse.json({message : "Unauthorized: No session valid"}, {status : 401}) 

        const {publicId} = await request.json() ; 
        if(!publicId) {
            console.error("Error : PublicId is missing") ; 
            return NextResponse.json({message : "PublicId missing !"} , {status : 400})
        }

        // await cloudinary.v2.uploader.destroy(publicId);
        await cloudinary.v2.uploader.destroy(publicId, { resource_type: "image" });


        const vacanceDelete = await Vacances.findOne({publicId}) ; 

        await Vacances.findByIdAndDelete(vacanceDelete._id) ; 

        return NextResponse.json({vacanceDelete} , {status : 200})  ;
       
    } catch (error) {
        console.error("Error while deleting vacance :" , error.message) ; 
        return NextResponse.json({message : "Internal error server"} , {status : 500});
    }
}