import mongoose from "mongoose"

export const connectDb=async()=>{
    try{
        // Check if MONGODB_URI is defined
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }

        const conn=await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Successfully connected to MongoDB:`, conn.connection.host)
    } catch(err){
        console.log("Error encountered while connecting to MongoDB:", err.message)
        process.exit(1) // Exit the process if database connection fails
    }
}