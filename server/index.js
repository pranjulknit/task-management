const express = require("express");
const dotenv = require("dotenv");
const app =   express();
require("./db")
dotenv.config();
app.use("/api",(req,res)=>{
    res.status(200).json({
        message:"hello express"
    })
})

app.listen(5000,()=>{
    console.log("server is running at port 5000");
})

