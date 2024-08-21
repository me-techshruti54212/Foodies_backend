const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{
        type:Object,default:{},
        // id: { type: mongoose.Schema.Types.ObjectId, ref: "food" },
        // qty:{type:Number}
        // type: mongoose.Schema.Types.Mixed,default:{}
    }
},
{minimize:false})


const userModel= mongoose.model("user",UserSchema);
module.exports={userModel}