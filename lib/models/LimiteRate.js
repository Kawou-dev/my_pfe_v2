import mongoose, { Schema } from "mongoose"



const schemaLimite = new Schema({
    prompt : {
        type: String, 
        required : true 
    }
}, {timestamps : true}) ; 

const LimiteModel = mongoose.models.Limite || mongoose.model('Limite' , schemaLimite) ; 

export default LimiteModel ; 