import User from "../Models/user.Model.js";
import bcryptjs from 'bcryptjs'

export const signup= async (req,res,next)=>{
    // console.log(req.body)

    // console.log(req.body);
    // res.json({message:"hit routes"})4
    const {username,email,password}=req.body;
    if(!username || !email||!password||username===''||email===""||password===""){
        return res.status(400).json({message:'All fields Are required'})
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
        res.status(400).json({message:error.message})
    }

    
}