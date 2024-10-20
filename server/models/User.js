const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
        type:String,
        required:true,
        trim:true,
    },
    graphUrls:{
        type:String,
        trim:true,
    },
},{timestamps:true});

module.exports = mongoose.model("User",UserSchema);