import express from "express";
import { verifyToken } from "../utills/verifyUser.js";
import { Create,test,getPosts } from "../Controllers/postController.js";

const router=express.Router();

router.get('/test',test)
router.post('/create',verifyToken,Create);
router.get("/getPosts",getPosts)

export default router