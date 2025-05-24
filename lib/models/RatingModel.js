import mongoose, { Schema } from "mongoose";


const ratingSchema = new Schema({
    rating : {
        type: Number , 
        required : true
    }, 
    userId : {
        type : String , 
        required : true , 
        ref : "UserModel"
    }
}, {timestamps: true}) ; 

const RatingModel = mongoose.models.Rating || mongoose.model("Rating" , ratingSchema) ; 
export default  RatingModel ; 