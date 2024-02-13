import User from "../Models/user.Model.js";
import Errorhandler from "../utills/Errorhandler.js";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"


export const signup= async (req,res,next)=>{
    // console.log(req.body);
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
        const token=jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},process.env.JWT_SECRET_KEY);
        const {password: pass,...rest}=newUser._doc
        res.status(200).cookie('access_token',token,{
            httpOnly:true,}).json({message:'Signup Succesfull',id:newUser._id,sucess:true}) 
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
        const token=jwt.sign({id:validUser._id,isAdmin: validUser.isAdmin},process.env.JWT_SECRET_KEY);
        const {password: pass,...rest}=validUser._doc
        res.status(200).cookie('access_token',token,{
            httpOnly:true,}).json(rest)
    } catch (error) {
        next(error)
    }
} 


export const google= async (req,res,next)=>{
    const {email,name,googlePhotoURL}=req.body;
    try {
        const user= await User.findOne({email})
        // console.log(user)
        if(user){
            const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET_KEY);
            const {password: pass,...rest}=user._doc
            res.status(200).cookie('access_token',token,{
            httpOnly:true,}).json(rest)
            // console.log(token)
        }else{
            const genratedPassword= Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedPassword=bcryptjs.hashSync(genratedPassword,10)
            const newuser=new User({
                username:name.toLowerCase().split(' ').join()+Math.random().toString(9).slice(-4),
                email,
                password:hashedPassword,
                profilePicture:googlePhotoURL,

            });
            await newuser.save();
            const token=jwt.sign({id:newuser._id,isAdmin:user.isAdmin},process.env.JWT_SECRET_KEY);
            const {password: pass,...rest}=newuser._doc
            res.status(200).cookie('access_token',token,{
            httpOnly:true,}).json(rest)
        }
    } catch (error) {
        next(error)
    }
} 



export const signout= (req,res,next)=>{
    try {
        res.clearCookie(`access_token`).status(200).json('User Sign Out Succesfully')
    } catch (error) {
        next(error)
    }
}
