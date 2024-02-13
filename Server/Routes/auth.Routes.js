import express from 'express'
import { signup,signin,google,signout } from '../Controllers/authController.js';

const router=express.Router();

router.post("/Signup",signup)
router.post("/Signin",signin)
router.post("/google",google)
router.post("/signout",signout)

export default router;