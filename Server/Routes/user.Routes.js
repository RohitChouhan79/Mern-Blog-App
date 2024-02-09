import express from "express";
import { test,updateUser,currentUser } from "../Controllers/user.Controller.js";
import { verifyToken } from "../utills/verifyUser.js";

const router=express.Router();

router.get("/test",test)
router.post("/CurrentUser",verifyToken,currentUser)
router.post("/update/:userID",verifyToken, updateUser)


export default router;