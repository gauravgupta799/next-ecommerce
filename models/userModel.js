import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
    },
    root:{
        type:Boolean,
        default: false,
    },
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/mobilefirst-application-pvt-ltd/image/upload/v1646723388/user_jnraiz.jpg"
    }
},{ timestamps: true })

let Dataset = mongoose.models.user || mongoose.model('user', userSchema);
export default Dataset;