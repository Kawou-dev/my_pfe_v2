import mongoose, { Schema } from "mongoose";



const CalendarSchema = new Schema({
    eventName : {
        type : String , 
        required : true , 
    }, 
    eventDate : {
        type : Date , 
        required : true 
    },
    userId : {
        type: String , 
        required : true ,
        ref : "UserModel" 
    }
}, {timestamps : true} ) ; 

const CalendarModel = mongoose.models.Calendar || mongoose.model("Calendar" , CalendarSchema) ; 

export default CalendarModel  ; 