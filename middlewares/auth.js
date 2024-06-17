const jwt= require("jsonwebtoken")


const authMiddleware=async(req,res,next)=>{
const token=req.headers["token"];
// console.log(authHeader)
// const [Bearer,token]=authHeader?.split(" ");


if(!token)
    {
        return  res.json({success:false,message:"Not Authorized"})
    }
try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        // console.log(token_decode)
        req.body.userId=token_decode.id;
        next();
    }
    catch(err){
        // console.log(err);
        res.json({success:false,message:"Errorr"})
    }
}

module.exports={authMiddleware}