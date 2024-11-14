import mongoose from "mongoose";

export const ConnectDB=async()=>{
    await mongoose.connect('mongodb+srv://banishonedirection:next123@cluster0.aieo8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log('DB connected');
    
}