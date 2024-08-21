
const express=require("express")
const oauthRouter=express.Router()
const {OAuth}=require("../controllers/oauthController")



oauthRouter.get("/",OAuth)



module.exports=oauthRouter