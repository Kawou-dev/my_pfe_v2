import mongoose, { Schema } from "mongoose";


const PdfSchema = new Schema({
    pdfName : {
        type : String , 
        required : true 
    }, 
    pdfUrl : {
        type : String , 
        required: true 
    },
    publicId: {
      type : String , 
      required : true
    } , 
    isCompleted : {
        type: Boolean , 
        required : true , 
        default : false
    }
    ,
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseModel",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
    },
}, {timestamps : true}) ; 

const PdfModel = mongoose.models.PDF || mongoose.model('PDF' , PdfSchema) ; 

export default PdfModel ; 