const {userModel}=require("../models/userModel")
const {foodModel}=require("../models/foodModel")
const addToCart=async(req,res)=>{
    // console.log(req.body.userId)
try{
    let userData=await userModel.findOne({_id:req.body.userId})
    // console.log(userData)
    let cartData=await userData.cartData;
    if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId]=1;

        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:cartData})
        res.json({success:true,message:"Added to cart"})
}
catch(err)
{
console.log(err)
res.json({success:false,message:"Error"})
}
}

const removeFromCart=async(req,res)=>{
    try{
        let userData=await userModel.findOne({_id:req.body.userId})
        
        let cartData=await userData.cartData;
       
      
        if(cartData[req.body.itemId]>1){
                cartData[req.body.itemId]-=1;
               
            }
         
            await userModel.findByIdAndUpdate(req.body.userId,{cartData})
            res.json({success:true,message:"removed from cart"}) 
    }
    catch(err)
    {
    console.log(err)
    res.json({success:false,message:"Error"})
    }
}
const getCart=async(req,res)=>{
    try{
    let userData=await userModel.findOne({_id:req.body.userId})
    let cartData=await userData.cartData;
    let foodData=[];
    for (const id in cartData) {
       let fooditem=await foodModel.findOne({_id:id});
    //    console.log(fooditem)
        foodData.push({_id:fooditem._id,name:fooditem.name,price:fooditem.price,image:fooditem.image,qty:cartData[id]});
    }
    res.json({success:true,cartData:foodData})
    
}
    catch(err){
        console.log(err)
        res.json({success:false,message:"Error"})
    }
   
}
const removeAll=async(req,res)=>{
    try{
        let userData=await userModel.findOne({_id:req.body.userId})
        console.log(userData)
      
        let myObjCopy = JSON.parse(JSON.stringify(userData));
        delete myObjCopy.cartData[req.body.itemId];
        const data=myObjCopy.cartData
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:data})

      
        }
        catch(err){
            console.log(err)
            res.json({success:false,message:"Error"})
        }
    


}



module.exports= {addToCart,removeFromCart,getCart,removeAll}