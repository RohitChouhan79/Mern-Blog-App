import express from "express";
import { verifyToken} from "../utills/verifyUser.js";
import { Create,test,getPosts,deletePosts,updatePosts } from "../Controllers/postController.js";

const router=express.Router();

router.get('/test',test)
router.post('/create',verifyToken,Create);
router.get("/getPosts",getPosts)
router.post("/deletPosts/:postId/:userId",verifyToken,deletePosts)
router.post("/updatePosts/:postId/:userId",verifyToken,updatePosts)

export default router