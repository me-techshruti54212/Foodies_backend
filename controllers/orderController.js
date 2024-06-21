const {orderModel}=require("../models/orderModel")
const {userModel}=require("../models/userModel")
const Stripe=require("stripe")


const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

const frontend_url=`${process.env.VITE_URL}`;

const placeOrder=async(req,res)=>{
    try{
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.orderdata.items,
            amount:req.body.orderdata.amount,
            address:req.body.orderdata.address,
            payment:Boolean(req.body.orderdata.payment)
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
        const line_items=req.body.orderdata.items?.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name

                },
                unit_amount:item.price*100
            },
            quantity:item.qty 

        }
    ))
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100,
                },
                quantity:1,
            }
        )
        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}verify?success=false&orderId=${newOrder._id}`,
            payment_method_types:["card"],
            
        })
        res.json({success:true,session_url:session.url})
    }
    catch(err)
        {
            console.log(err)
        }



}
const verifyOrder=async(req,res)=>{
    const {success,orderId}=req.body;
   
   
        try{
          
    if(success=="true")
        {
           await orderModel.findByIdAndUpdate(req.body.orderId,{payment:true})
           res.json({success:"true"})
        }
        else{
           await orderModel.findByIdAndDelete(req.body.orderId)
           res.json({success:"false"})

        }
    }
    catch(err)

    {
        console.log(err)
    }
}

const userOrders=async(req,res)=>
    {
        
    try
    { 
       let userOrders=await orderModel.find({userId:req.body.userId})
// console.log(userOrders)
        res.json({success:"true",data:userOrders});
    }
    catch(err)
        {
            res.json({success:false,message:"Error"})
        }

        
    }

    const listOrders=async(req,res)=>{
        try{
            const orders=await orderModel.find({});
            res.json({success:true,data:orders})
        }
        catch(err){
            res.json({success:false,message:"Error"})
        }
    }

const orderStatus=async(req,res)=>{
    try{
       await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true})
    }
    catch(err){
        res.json({success:false,message:"Error"})
    }
}




module.exports={placeOrder,verifyOrder,userOrders,listOrders,orderStatus}