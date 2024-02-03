import User from "../Models/user.Model.js";
import Errorhandler from "../utills/Errorhandler.js";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"


export const signup= async (req,res,next)=>{

    const {username,email,password}=req.body;
    if(!username || !email||!password||username===''||email===""||password===""){
        next(new Errorhandler("All fields are Required",400))
    }

    const hashedPassword=bcryptjs.hashSync(password,10)

    const newUser= new User({
        username,
        email,
        password:hashedPassword,
    })

    try {
        await newUser.save();
        res.json({message:'Signup Succesfull'}) 
    } catch (error) {
        next(error)
    }

    
}


export const signin= async (req,res,next)=>{
    const {email,password}=req.body;
    if( !email||!password||email===""||password===""){
        next(new Errorhandler("All fields are Required",400))
    }
    
    try {
        const validUser= await User.findOne({email});
        if(!validUser){
            return next(new Errorhandler("User Not Found",404))
        }
        const validPassword= bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(new Errorhandler("Invalid Password",400))
        }
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET_KEY);
        const {password: pass,...rest}=validUser._doc
        res.status(200).cookie('access_token',token,{
            httpOnly:true}).json(rest)
    } catch (error) {
        next(error)
    }
} 