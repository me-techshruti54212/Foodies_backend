const express=require("express")
const cors=require("cors")
const {connectDb}=require("./config/db.js")
const {foodRouter}=require("./routes/foodRoute.js")
const bodyParser=require('body-parser')
const userRouter=require("./routes/userRoute.js")
const dotenv=require("dotenv/config")
// require('dotenv').config() 
const {cartRouter} = require("./routes/cartRoute.js")
const {orderRouter} =require("./routes/orderRoute.js")

const app=express()

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
const port=  process.env.PORT || 7000
app.listen(port,()=>{console.log(`Server started at http://localhost:${port}`)})


