import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  response : {
      type: String ,  
      default : ""
  },
  status : {
      type : Boolean , 
      default : false ,
  }, 
  isSeenByUser : {
    type : Boolean , 
     default : false , 
  }
  ,
  userId : {
    type : String , 
    required : true , 
    ref : "UserModel"
}
}, {timestamps : true});

const TicketModel =  mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);

export default TicketModel ; 

// import mongoose from "mongoose";

// const TicketSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true
//   },
//   content: {
//     type: String,
//     required: true
//   },
//   response : {
//       type: String ,  
//       default : ""
//   },
//   status : {
//       type : String , 
//       default : false ,
//   }
//   ,
//   userId : {
//     type : String , 
//     required : true , 
//     ref : "UserModel"
// }
// }, {timestamps : true});

// const TicketModel =  mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);

// export default TicketModel ; 

