const {placeOrder,verifyOrder, userOrders,listOrders,orderStatus}=require("../controllers/orderController")
const express=require("express")
const {authMiddleware}=require("../middlewares/auth")

const orderRouter=express.Router()

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userOrders",authMiddleware,userOrders)
orderRouter.get("/listOrders",listOrders)
orderRouter.post("/status",orderStatus)


module.exports={orderRouter}