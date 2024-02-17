
import Comment from "../Models/comment.Model.js"
import Errorhandler from "../utills/Errorhandler.js"

export const createComment= async(req,res,next)=>{
    try {
        const{content,postId,userId}=req.body

        if(userId !=req.user.id){
            return next(Errorhandler('You are not allowed to create this Comment'))
        }
        const newComment= new Comment({
            content,
            postId,
            userId,
        })
        await newComment.save()
        res.status(200).json(newComment);
    } catch (error) {
        next(error)
    }
}


export const getPostComment=async(req,res,next)=>{
    console.log('daDWD');
    try {
        const comments= await Comment.find({postId:req.params.postId}).sort({
            createdAt:-1,
        });
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}