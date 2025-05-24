import mongoose , { Schema } from "mongoose"



const courseSchema = new Schema({
    title: {
        type : String , 
        required : true , 
    } , 
    // notes : {
    //     type : String , 
    //     required : false 
    // }, 
    userId : {
        type : String , 
        required : true , 
        ref : "UserModel"
    }
}, {timestamps : true} ) ; 


const CourseModel = mongoose.models.Course || mongoose.model("Course" , courseSchema) ; 
export default CourseModel ; 