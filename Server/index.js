import express from  "express";
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from "./Routes/user.Routes.js"
import authRoutes from "./Routes/auth.Routes.js"
import postRoutes from './Routes/post.Route.js'
import commentRoutes from "./Routes/comment.Routes.js"
import cookieParser from "cookie-parser";
import path from 'path';
const app=express();
// app.use(express.json());

// Db Connected

import { connectDatabase } from "./Models/config.js";
connectDatabase();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// config cors
import cors from "cors";
app.use(cors({ origin: true, credentials: true }));
// app.use(cors({ origin: 'http://localhost:3000' , credentials :  true,  methods: 'GET,PUT,POST,OPTIONS', allowedHeaders: 'Content-Type,Authorization' }))

// logger
 import logger from "morgan"
 app.use(logger("tiny"))

//  Bodyparser
 app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());    



//  Routes

app.use('/',(req, res, next)=>{res.json({message:'connected'})})
 app.use('/api/User',userRoutes)
 app.use('/api/auth',authRoutes)
 app.use('/api/post',postRoutes)
 app.use('/api/comment',commentRoutes)

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