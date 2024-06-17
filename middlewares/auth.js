const jwt= require("jsonwebtoken")


const authMiddleware=async(req,res,next)=>{
const token=req.headers["token"];



if(!token)
    {
        return  res.json({success:false,message:"Not Authorized"})
    }
try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId=token_decode.id;
        next();
    }
    catch(err){
        res.json({success:false,message:"Errorr"})
    }
}

module.exports={authMiddleware}