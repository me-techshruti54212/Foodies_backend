const express=require("express")
const cors=require("cors")
const {connectDb}=require("./config/db.js")
const {foodRouter}=require("./routes/foodRoute.js")
const bodyParser=require('body-parser')
// const oauthRouter=require("./routes/oauthRoute.js")
const userRouter=require("./routes/userRoute.js")
// const requestRouter=require("./routes/requestRoute.js")
const dotenv=require("dotenv/config")
// require('dotenv').config() 
const {cartRouter} = require("./routes/cartRoute.js")
const {orderRouter} =require("./routes/orderRoute.js")
const otpRoutes=require("./routes/otpRoute")

const app=express()
app.use("/public",express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())

connectDb()

app.get("/",(req,res)=>res.send("Hello"))
app.use("/api/food",foodRouter)
app.use("/images",express.static(__dirname + '/uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api",otpRoutes)

// app.use("/api/auth",requestRouter)
// app.use("/oauth",oauthRouter)
const port=  process.env.PORT || 7000
app.listen(port,()=>{console.log(`Server started at http://localhost:${port}`)})


