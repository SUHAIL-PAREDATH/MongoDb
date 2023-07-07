const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/LoginSignup")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=> {
    console.log("Connection failed!!");
})

const LoginSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },

})


const collection = new mongoose.model("collection1", LoginSchema)

module.exports = collection
