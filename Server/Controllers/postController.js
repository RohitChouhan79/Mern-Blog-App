import Post from "../Models/post.Model.js";
import Errorhandler from "../utills/Errorhandler.js"

export const Create = async (req,res,next)=>{
    console.log(req.body);
    if(!req.body.title){
        return next(new Errorhandler("Please Provide Title",403))
    }
    const slug=req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'-');
    const newPost=new Post({
        ...req.body,
        slug,
        userId:req.user.id,
    })
    try {
        const savedPost= await newPost.save()
        res.status(201).json(savedPost)
    } catch (error) {
        next(error)
    }
}

export const test =async (req,res,next)=>{
    res.json({message:"Api Is Working"})
}