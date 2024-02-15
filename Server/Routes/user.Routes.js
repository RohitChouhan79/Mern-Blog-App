import express from "express";
import { test,updateUser,currentUser,deleteUser,getusers } from "../Controllers/user.Controller.js";
import { verifyToken } from "../utills/verifyUser.js";

const router=express.Router();

router.get("/test",test)
router.post("/CurrentUser",verifyToken,currentUser)
router.post("/update/:userID",verifyToken, updateUser)
router.post("/delete/:userID",verifyToken, deleteUser)
router.get("/getusers",verifyToken,getusers)



export default router;