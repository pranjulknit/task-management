const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const cookieparser = require("cookie-parser");
const { userRouter } = require("./router/user-router");
const app =   express();
require("./db")
dotenv.config();


app.use(cors({credentials:true}));

app.use(cookieparser());

app.use("/api/user",userRouter);

app.use("/api",(req,res)=>{
    res.status(200).json({
        message:"hello express"
    })
})

app.use("/api")

app.listen(5000,()=>{
    console.log("server is running at port 5000");
})

