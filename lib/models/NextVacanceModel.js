import mongoose from "mongoose";
import { Schema } from "mongoose";



const NextVacanceSchema = new Schema({
    cityName: {
        type: String , 
        required : true , 
    },
    prevDate: {
        type : Date , 
        required : true
    }, 
    priority: {
        type : String , 
        required : true , 
        enum : ["Basse", "Moyenne", "Haute"]
    },
    userId : {
        type : String , 
        required : true ,
        ref : 'UserModel'
    }
}, {timestamps : true}) ; 

const NextVacanceModel = mongoose.models.NextVacance || mongoose.model("NextVacance", NextVacanceSchema) ; 
export default NextVacanceModel ; 