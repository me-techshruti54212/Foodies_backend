const express=require("express")
const cors=require("cors")
const {connectDb}=require("./config/db.js")
const {foodRouter}=require("./routes/foodRoute.js")
const bodyParser=require('body-parser')
const userRouter=require("./routes/userRoute.js")
const dotenv=require("dotenv/config")


const app=express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())

connectDb()

app.get("/",(req,res)=>res.send("Hello"))
app.use("/api/food",foodRouter)
app.use("/images",express.static(__dirname + '/uploads'))
app.use("/api/user",userRouter)

app.listen(process.env.PORT,()=>{`Server started at http://localhost:${process.env.PORT}`})


