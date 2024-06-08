const jwt= require("jsonwebtoken")


const authMiddleware=async(req,res,next)=>{
const token=req.headers["token"];
// console.log(authHeader)
// const [Bearer,token]=authHeader?.split(" ");
// const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjNlOGNhMTg4NzMyYTE3MTc0NzgwYiIsImlhdCI6MTcxNzgyMzY5MH0.dmRYzlFGFtpOuOPz2YeS3Lt7Y2jiN8q7ljoXqLzQix8"
// console.log(token)
if(!token)
    {
        return res.json({success:false,message:"Not Authorized"})
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