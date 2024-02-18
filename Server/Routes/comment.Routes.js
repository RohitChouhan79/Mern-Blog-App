import express from 'express';
import { verifyToken } from '../utills/verifyUser.js';
import { createComment,getPostComment,likeComment,editComment,DeleteComment,getcomments } from '../Controllers/commentController.js';

const router=express.Router();

router.post('/create',verifyToken,createComment)
router.get('/getPostComments/:postId',verifyToken,getPostComment)
router.post('/likeComment/:commentId', verifyToken, likeComment);
router.post('/editComment/:commentId', verifyToken, editComment);
router.post('/DeleteComment/:commentId', verifyToken, DeleteComment);
router.get('/getcomments', verifyToken, getcomments);


export default router