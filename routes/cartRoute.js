const express=require("express")
const {addToCart,removeFromCart,getCart,removeAll}=require("../controllers/cartController")
const {authMiddleware}=require("../middlewares/auth")

const cartRouter=express.Router();

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.get("/get",authMiddleware,getCart)
cartRouter.post("/removeAll",authMiddleware,removeAll)


module.exports={cartRouter}