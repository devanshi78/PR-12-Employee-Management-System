import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    salary : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    // department : {
    //     type : String,
    //     required : true
    // },
    role : {
        type : String,
        enum : ['admin','manager','employee'],
        default : 'employee'
    },
})

const Usermodel = mongoose.model('usermodel',userSchema);

export default Usermodel;