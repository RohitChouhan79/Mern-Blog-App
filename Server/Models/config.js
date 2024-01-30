import mongoose from "mongoose";

const connectDatabase= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("Database Connection Establish")
    } catch (error) {
        console.log(error.message)
    }
}

export {connectDatabase}