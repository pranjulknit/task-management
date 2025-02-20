const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const cookieparser = require("cookie-parser");
const { userRouter } = require("./router/user-router");
const app =   express();
require("./db")
dotenv.config();

const middile = (req,res,next)=>{
    console.log("req",req.body);
    next();
}

const allowedOrigin = 'http://localhost:5175';  // Replace with your frontend's URL

app.use(
  cors({
    origin: allowedOrigin,  // Allow requests only from your frontend's origin
    credentials: true,      // Allow sending cookies and credentials with requests
  })
);
app.use(express.json());

app.use(cookieparser());






app.use("/api/user",userRouter);

app.use("/api",(req,res)=>{
    res.status(200).json({
        message:"hello express"
    })
})


app.listen(5000,()=>{
    console.log("server is running at port 5000");
})

