import express from  "express";
import dotenv from 'dotenv';
dotenv.config();

const app=express();

// Db Connected

import { connectDatabase } from "./Models/config.js";
connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`Server Are running On Port ${process.env.PORT}`)
});