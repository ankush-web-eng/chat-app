import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    message: {
        type:String,
        required : true,
    },
    name :{
      type:String,
      required : true,
    }
  },
  {
    timestamps: true,
  }
)

const Message = mongoose.models.messages || mongoose.model("messages", chatSchema);

export default Message 
