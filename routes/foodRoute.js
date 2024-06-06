const express=require("express")
const multer=require("multer")
const {addFood, listAllFood,removeFood}=require("../controllers/foodController") 
const foodRouter=express.Router()

const storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
      },
      filename: function (req, file, cb) {
       cb(null,  `${Date.now()} ${file.originalname}`)
      }
    // filename:(req,file,cb)=>{
    //     return cb(null,`${Date.now()}${file.originalname}`);
    // }
})

const upload=multer({storage:storage})
foodRouter.get("/",(req,res)=>res.send({success:true}))
foodRouter.post("/add",upload.single("image"),addFood)

foodRouter.get("/list",listAllFood)
foodRouter.post("/removefood",removeFood)

module.exports={foodRouter};
