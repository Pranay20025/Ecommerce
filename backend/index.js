import express from "express";
import cors from "cors";
import { connectdb } from "./connect/connectDB.js";
import userRouter from "./router/userRoute.js";
import productRouter from "./router/productRoute.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import path from "path"
dotenv.config(); 

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(express.json());
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"]; 

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

const __dirname = path.resolve(); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

connectdb();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
