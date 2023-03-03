const mongoose = require("mongoose"); //call package

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email:{
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
 
  phone:{
    type:Number,
    require:true,
  },
  profession:{
    type:String,
    require:true,
  },
  confirmPassword:{
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
},
{timestamps:true}
);
//timestamps created and updated at time
//Change didgit

//syntax for exports
module.exports=mongoose.model("user",userSchema)