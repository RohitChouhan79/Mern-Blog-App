import express from "express";
import { test } from "../Controllers/user.Controller.js";

const router=express.Router();

router.get("/test",test)


export default router;