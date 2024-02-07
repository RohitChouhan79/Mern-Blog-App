import jwt from "jsonwebtoken"
import Errorhandler from "./Errorhandler.js";



export const verifyToken= (req,res,next) =>{

    const token= req.cookies.access_token;
    console.log(token);
    if(!token){
        return next(new Errorhandler("Invalid Password",401));
    }
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
            return next(new Errorhandler("Unautherized",401));
        }
        req.user=user
        next();
    });
};