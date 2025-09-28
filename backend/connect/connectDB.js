import mongoose from "mongoose";

export const connectdb = async () =>{
mongoose.connect("mongodb+srv://p46106535:xPoW9hCplC6o6Xxl@cluster0.ls3n7.mongodb.net/ECommmerce")
.then(()=>{console.log("MongoDB connected")})
.catch((error)=>{console.log(error)})
};