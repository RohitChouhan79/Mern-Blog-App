import User from "../Models/user.Model.js";
import Errorhandler from "../utills/Errorhandler.js";
import bcryptjs from 'bcryptjs'

export const signup= async (req,res,next)=>{
    // console.log(req.body)

    // console.log(req.body);
    // res.json({message:"hit routes"})4
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