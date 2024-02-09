import jwt from "jsonwebtoken"
import Errorhandler from "./Errorhandler.js";



export const verifyToken= (req,res,next) =>{

    const token= req.cookies.access_token;
    console.log(token, 'check')
    if(!token){
        return next(new Errorhandler("Please login in to access the resource",401));
    }
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
            return next(new Errorhandler("Unautherized",401));
        }
        req.user=user
        console.log('ver')
        next();
    });
};