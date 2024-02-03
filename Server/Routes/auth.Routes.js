import express from 'express'
import { signup,signin,google } from '../Controllers/authController.js';

const router=express.Router();

router.post("/Signup",signup)
router.post("/Signin",signin)
router.post("/google",google)

export default router;