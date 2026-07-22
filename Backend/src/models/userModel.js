const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique : [true, "username already exist"], 
    required : [true , "username is required" ],
  } , 
  email : {
    type : String,
    unique : [true , "Email already exist"],
    required : [true , "email is required"]
  },
  password : {
    type : String,
    required : [true , "password is required"],
    select: false
  },
  bio : String,
  profileImage : {
    type : String
  },
   isPrivate : {
    type : Boolean,
    default : false
   } 
}) 

const userModel = mongoose.model("user", userSchema)

module.exports = userModel