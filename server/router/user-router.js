const express = require("express");
const { registerUser, loginUser, logout } = require("../controllers/user-controller");
const { userAuthentication } = require("../middilware/auth-middileware");

const userRouter = express.Router();




userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/auth",userAuthentication)
userRouter.post("/logout",logout);

module.exports = {
    userRouter
}