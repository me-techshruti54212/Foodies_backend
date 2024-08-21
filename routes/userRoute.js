const express=require("express")
const {loginUser,registerUser,forgotPasswordUser,resetPassword}=require("../controllers/userController")
// const {sendOTP,verifyOTP} =require("../controllers/otpController")
const userRouter=express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/forgot-password",forgotPasswordUser)
userRouter.post("/reset-password/:id/:token",resetPassword)

module.exports=userRouter