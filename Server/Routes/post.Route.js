import express from "express";
import { verifyToken } from "../utills/verifyUser.js";
import { Create,test } from "../Controllers/postController.js";

const router=express.Router();

router.get('/test',test)
router.post('/create',verifyToken,Create);

export default router