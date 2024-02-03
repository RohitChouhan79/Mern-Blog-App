import express from 'express'
import { signup,signin } from '../Controllers/authController.js';

const router=express.Router();

router.post("/Signup",signup)
router.post("/Signin",signin)

export default router;