import express from 'express';
import { verifyToken } from '../utills/verifyUser.js';
import { createComment,getPostComment } from '../Controllers/commentController.js';

const router=express.Router();

router.post('/create',verifyToken,createComment)
router.get('/getPostComments/:postId',verifyToken,getPostComment)

export default router