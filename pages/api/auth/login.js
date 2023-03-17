import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import  valid from "../../../utils/valid";
import bcrypt from "bcrypt";
import {createAccessToken, createRefreshToken} from "../../../utils/generateToken"

connectDB();

export default async(req, res)=>{
    switch (req.method) {
        case 'POST':
            await login(req, res)   
        default:
            break;
    }
}

const login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await Users.findOne({email});
        if(!user) return res.status(400).json({err:"This email doesn't exist."})
        const matchPass = await bcrypt.compare(password, user.password)
        if(!matchPass) return res.status(400).json({
            err:"Incorrect password or email."
        })

        const access_token = createAccessToken({id:user._id})
        const refresh_token = createRefreshToken({id:user._id})
        res.status(200).json({
            msg:"Logged In Successfull!",
            access_token,
            refresh_token,
            user:{
               name: user.name,
               email:user.email,
               role:user.role,
               avatar:user.avatar,
               root:user.root, 
            }
        })  
    } catch (error) {
        res.status(500).json({msg:error.message});
        console.log({msg:error.message})
    }
}
