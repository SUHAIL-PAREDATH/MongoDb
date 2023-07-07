const mongoose = require('mongoose')

const addUserSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },

})


const Userdb = new mongoose.model("userdb", addUserSchema)
module.exports = Userdb


// Login page schema
