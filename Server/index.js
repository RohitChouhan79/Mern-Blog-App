import express from  "express";
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from "./Routes/user.Routes.js"
import authRoutes from "./Routes/auth.Routes.js"
import cookieParser from "cookie-parser";
const app=express();
// app.use(express.json());

// Db Connected

import { connectDatabase } from "./Models/config.js";
connectDatabase();

// logger
 import logger from "morgan"
 app.use(logger("tiny"))

//  Bodyparser
 app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());    



//  Routes

 app.use('/api/User',userRoutes)
 app.use('/api/auth',authRoutes)

//  error handling
import Errorhandler from "./utills/Errorhandler.js";

app.all("*",(req,res,next)=>{
    next(new Errorhandler(`Requested URL not Found ${req.url}`,404))
})
app.use((err,req,res,next)=>{
    const statuscode=err.statuscode ||500;
    if(err.name==="MongoServerError" && err.message.includes("E11000 duplicate key")){
        err.message="User With This Email Is Already exits"
    }
    res.status(statuscode).json({
        message:err.message,
        errName:err.name,
        stack:err.stack,
    })


})


app.listen(3000,()=>{
    console.log(`Server Are running On Port ${3000}`)
});