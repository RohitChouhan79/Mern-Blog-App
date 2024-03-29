import User from "../Models/user.Model.js";
import Errorhandler from "../utills/Errorhandler.js";
import bcryptjs from "bcryptjs"
import { catchAsyncError } from "./middlewares/catchAsyncError.js";

export const test= (req,res,next)=>{
    res.json({message:"Api Is Working"})
};

export const currentUser= catchAsyncError(async(req,res,next)=>{
    // console.log(req.user.id);
    const user= await User.findById(req.user.id).exec();
    // console.log(user);
    res.json({User:user})
})


export const updateUser= async (req,res,next)=>{
    // console.log(req.body,'update is running', req.params.userID);    
    if(req.user.id !== req.params.userID){
        return next(new Errorhandler("You are not allowed to update this User",403));
    }
    if(req.body.password){
        if(req.body.password.length < 6 ){
            return next(new Errorhandler("Password must be at least 6 Characters",400));
        }
        req.body.password=bcryptjs.hashSync(req.body.password,10);
    }
    if(req.body.username){
        if(req.body.username.length > 20 ){
            return next (new Errorhandler("Username must be less then Character",400))
        }
        if(req.body.username.includes(' ')){
            return next (new Errorhandler("Username Cannot contain Spaces",400))
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(new Errorhandler("Username Must be lowercase",400))
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(new Errorhandler("Username Can only Contains letters and Numbers",400))
        }
    }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.userID,{
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    profilePicture:req.body.profilePicture,
                    password:req.body.password,
                },
            },{new:true});
            const {password, ...rest}=updateUser._doc;
            res.json(rest)
        } catch (error) {
            console(error)
            next(error)
        }
};




export const deleteUser= async (req,res,next)=>{
    if(req.user.id !== req.params.userID){
        return next(new Errorhandler("You are not allowed to Delete this User",403));
    }
    try {
        await User.findByIdAndDelete(req.params.userID);
        res.status(200).json('User Has been deleted')
    } catch (error) {
        next(error);
    }
};

export const getusers= async (req,res,next)=>{
    try {
            const startIndex = parseInt(req.query.startIndex) || 0;
            const limit = parseInt(req.query.limit) || 9;
            const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        
            const users = await User.find()
              .sort({ createdAt: sortDirection })
              .skip(startIndex)
              .limit(limit);
        
            const usersWithoutPassword = users.map((user) => {
              const { password, ...rest } = user._doc;
              return rest;
            });
        
            const totalUsers = await User.countDocuments();
        
            const now = new Date();
        
            const oneMonthAgo = new Date(
              now.getFullYear(),
              now.getMonth() - 1,
              now.getDate()
            );
            const lastMonthUsers = await User.countDocuments({
              createdAt: { $gte: oneMonthAgo },
            });
        
            res.status(200).json({
              users: usersWithoutPassword,
              totalUsers,
              lastMonthUsers,
            });
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return(next(Errorhandler(404,'User Not Found')))
      }
      const { password, ...rest } = user._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };