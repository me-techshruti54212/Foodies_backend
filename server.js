const express=require("express")
const cors=require("cors")
const {connectDb}=require("./config/db.js")
const {foodRouter}=require("./routes/foodRoute.js")
const bodyParser=require('body-parser')
const userRouter=require("./routes/userRoute.js")
const dotenv=require("dotenv/config")
const {cartRouter} = require("./routes/cartRoute.js")


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

app.listen(process.env.PORT,()=>{`Server started at http://localhost:${process.env.PORT}`})


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjAwZTY3MjZjNTgzNTUyZTI3ODE1MyIsImlhdCI6MTcxNzcwODk0OH0.pLDocyEh3V3eh_kUkrXhx2S-Iuh0k_XKNo_YvLLyYmI