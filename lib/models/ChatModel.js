import mongoose, {Schema} from "mongoose"


const ChatSchema = new Schema({
    message : {
        type : String , 
        required : true , 
    }, 
    userId : {
        type :  mongoose.Schema.Types.ObjectId  , 
        ref : "UserModel" , 
        required : true
    }
}, {timestamps : true}) ; 

const ChatModel = mongoose.models.Chat || mongoose.model("Chat" , ChatSchema) ; 

export default ChatModel ; 