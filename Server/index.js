import express from  "express";
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from "./Routes/user.Routes.js"
import authRoutes from "./Routes/auth.Routes.js"
import bodyParser from "body-parser";
const app=express();
// app.use(express.json());

// Db Connected

import { connectDatabase } from "./Models/config.js";
connectDatabase();

// logger
 import logger from "morgan"
 app.use(logger("tiny"))

 app.use(express.json());
app.use(express.urlencoded({extended:false}));




//  Routes

 app.use('/api/User',userRoutes)
 app.use('/api/auth',authRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server Are running On Port ${process.env.PORT}`)
});