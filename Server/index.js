import express from  "express";
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from "./Routes/user.Routes.js"
const app=express();

// Db Connected

import { connectDatabase } from "./Models/config.js";
connectDatabase();

// logger
 import logger from "morgan"
 app.use(logger("tiny"))

//  Routes

 app.use('/User',userRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server Are running On Port ${process.env.PORT}`)
});