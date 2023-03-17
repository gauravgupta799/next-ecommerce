import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import jwt from "jsonwebtoken";
import {createAccessToken} from "../../../utils/generateToken"

connectDB();

export default async (req,res)=>{
    try {
        const rf_token = await req.cookies.refreshtoken;
        if(!rf_token) return res.status(400).json({err:"Please Login First!"});
        const result = jw.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
        if(!result) return res.status(400).json({err:"Invalid token or has expired."}); 
        const user = await Users.findById(result.id);
        if(!user) return res.status(400).json({err:"User doesn't exist."});
        const access_token = createAccessToken({id:user._id});
        res.status(200).json({
            access_token,
            user:{
                name:user.name,
                email:user.email,
                role:user.role,
                avatar:user.avatar,
                root:user.root,
            }
        })
    } catch (error) {
        return res.status(500).json({err:error.message});
    }
}