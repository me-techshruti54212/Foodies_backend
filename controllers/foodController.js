const {foodModel} =require("../models/foodModel.js") ;
const fs=require("fs")
const addFood=async(req,res)=>{
    let image_filename =req.file.filename

    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.json({success:"food Added"})
    }
    catch(err)
    {
        console.log(err)
        res.json({success:false})
    }
}
const listAllFood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({data:foods})
    }
    catch(err)
    {
        console.log(err)
    }
}
const removeFood=async(req,res)=>{
    try{
        const food=await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,(err)=>console.log(err))
    await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:"deleted"})
    }
    catch(err)
    {
        console.log(err)
    }
}
module.exports={addFood,listAllFood,removeFood};
