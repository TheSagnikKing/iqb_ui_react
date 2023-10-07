const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        required:true
    },
    // imageURL:{
    //     type:String,
    //     required:true
    // },
    userId:{
        type:String,
        required:true
    },
    email_verified:{
        type:Boolean,
        required:true
    },
    auth_time:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },

    isUser:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema)

module.exports = User