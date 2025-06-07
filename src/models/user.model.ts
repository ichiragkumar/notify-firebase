import mongoose, {Schema} from "mongoose"; 
import P from "pino";


const userSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    fcmTokens:{
        type:[String],
        required:true
    }
})


export const UserModel = mongoose.model("User",userSchema)