import mongoose, { Schema } from "mongoose"
const vacanceSchema = new Schema({
       cityName : {
            type : String,
            required : true , 
       },
       experience : {
            type :String , 
            required : false 
       }, 
       images : {
              type  : [String], 
              required : true 
       } ,
        publicId : {
          type : String , 
          required : true , 
        }
       ,
       favori : {
          type : Boolean , 
          required : false ,
          default : false , 
       } , 
        userId : {
          type : String , 
          ref : "UserModel" , 
          required : true
        }
}, {timestamps : true  }) ; 

const Vacances = mongoose.models.vacance || mongoose.model("vacance" , vacanceSchema) ; 

export default Vacances ; 