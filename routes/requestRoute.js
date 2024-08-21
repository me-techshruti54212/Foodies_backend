const express=require("express")
const {requestGoogle}=require("../controllers/requestController")

const requestRouter=express.Router();

requestRouter.post("/request",requestGoogle);


module.exports=requestRouter