import express from 'express'
import { signup } from '../Controllers/authController.js';

const router=express.Router();

router.post("/Signup",signup)

export default router;