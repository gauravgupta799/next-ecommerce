import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import  valid from "../../../utils/valid";
import bcrypt from "bcrypt";

connectDB();

export default async(req, res)=>{
    switch (req.method) {
        case 'POST':
            await register(req,res)   
        default:
            break;
    }
}

const register = async (req,res)=>{
    try {
        const {name, email, password, conf_password} = req.body;
        const errMsg = valid(name, email, password, conf_password)
        if(errMsg){
            return res.status(400).json({err:errMsg});
        }
        const user = await Users.findOne({email});
        if(user) return res.status(400).json({err:"This email already exist."})
        const passwordHash = await bcrypt.hash(password ,12);
        const newUser = new Users({ name, email, password:passwordHash });
        await newUser.save();
        res.status(200).json({msg:"Register Success!"})
    } catch (error) {
        
    }

}