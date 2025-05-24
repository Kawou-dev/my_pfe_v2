//app/api/course/[id]/note/route.js
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/config/connectDB";
import NoteModel from "@/lib/models/NoteModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// export async function GET(request, {params}) {
//     try {
//         const session = await getServerSession(authOptions) ; 
//         if(!session){
//             return NextResponse.json({message: "Unauthorized : No valid Session"} , {status : 401}) ; 
//         }
//         const {id} = await params ; 
//         console.log( "id  get method ----->" ,   id) ; 

//         const noteSpecific = await NoteModel.findOne(
//            { courseId: id,
//             userId: session.user.id}
//         ) ; 
//         console.log("Specific note ---> " , noteSpecific) ;
//         if(!noteSpecific) return NextResponse.json({message: "No not found"}, {status : 404}) ; 
//         return NextResponse.json({noteSpecific}) ; 
//     } catch (error) {
//         console.log("Error goy " , error.message) ; 
//         return NextResponse.json({message: "Something went wrong"}, {status : 500}) ; 
//     }
// }
export async function GET(request, { params }) {
    try {
      await connectDB() ; 
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized : No valid Session" }, { status: 401 });
        }

        const { id } = await params; // id correspond ici au cours
        console.log("id GET method ----->", id);

        // On cherche la note avec le courseId et l'userId correspondant à la session de l'utilisateur
        const noteSpecific = await NoteModel.findOne({
            courseId: id,
            userId: session.user.id
        });
            // console.log("Specific course --->" , noteSpecific) ; 
        if (!noteSpecific) {
            return NextResponse.json({ message: "Note not found" }, { status: 404 });
        }

        // Retourne la note spécifique trouvée
        return NextResponse.json({ noteSpecific }, { status: 200 });

    } catch (error) {
        console.log("Error fetching note", error.message);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}


// export async function POST(request, {params} ){
//     try {
//         const session = await getServerSession(authOptions) ; 
//         if(!session){
//             return NextResponse.json({message: "Unauthorized : No valid Session"} , {status : 401}) ; 
//         }
//         const {id} = await params ; 
//         console.log( "id post method ----->" ,   id) ; 
//         const {note} = await request.json() ; 
//         const newNote = await NoteModel.create({note, courseId: id , userId : session.user.id }) ; 
//         return NextResponse.json({newNote: newNote}, {status: 201}) ; 
//     } catch (error) {
//         console.error("Erreur posting note :" , error.message)  ; 
//         return NextResponse.json({message: "Internal error server or n"} , {status: 500}) ; 
//     }
// }

export async function POST(request, { params }) {
    try {
      await connectDB() ; 
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ message: "Unauthorized : No valid Session" }, { status: 401 });
      }
  
      const { id } =    await params;
      const { note } = await request.json();
  
      // Vérifie si une note existe déjà pour ce cours et cet utilisateur
      const existingNote = await NoteModel.findOne({
        courseId: id,
        userId: session.user.id,
      });
  
      if (existingNote) {
        // Si oui, on met à jour
        existingNote.note = note;
        await existingNote.save();
        return NextResponse.json({ message: "Note updated", note: existingNote }, { status: 200 });
      } else {
        // Sinon, on crée une nouvelle note
        const newNote = await NoteModel.create({
          note,
          courseId: id,
          userId: session.user.id,
        });
        return NextResponse.json({ message: "Note created", note: newNote }, { status: 201 });
      }
    } catch (error) {
      console.error("Erreur posting note :", error.message);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }
  


