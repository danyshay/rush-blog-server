

const mongoose = require("moongoose");


let postScheme = new mongoose.Scheme({

    title:{
        type:String,
        default:"",
        required:true
    },
    body:{
        type:String,
        default:"",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    },
    updatedAt:{

    }


});