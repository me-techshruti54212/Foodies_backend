
const {userModel}=require("../models/userModel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const validator=require("validator")

// Login user
const loginUser=async(req,res)=>{
const {email,password}=req.body;
try{
   
    const user=await userModel.findOne({email});

    if(!user)
        {
           return res.json({success:false,message:"User doesn't exists"}) 
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
            {
                return res.json({success:false,message:"Invalid Password"})
            }
            const token=createToken(user._id);
            res.json({success:true,token})
}
catch(err)
{
    console.log(err)
    res.json({success:false,message:"Error in login occured"})
}
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


// Register User
const registerUser=async(req,res)=>{
const {name,email,password}=req.body;
console.log(name,email,password)
try{
const userexists=await userModel.findOne({email});
if(userexists)
    {
        return res.json({success:false,message:"User already exists"})
    }
 else{
        if(!validator.isEmail(email))
            {
                return res.json({success:false,message:"Please enter valid email"})
            }
          if(password.length<8)
            {
                return res.json({success:false,message:"Please enter a strong password"})
            }  
            // hasing user pwd

            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(password,salt);
            const newUser=new userModel({
                name:name,email:email,
                password:hashedPassword
            });
            const user = await newUser.save();
            const token=createToken(user._id)
            res.json({success:true,token});

    }
}
catch(err)
{
console.log(err);
}
}

module.exports= {loginUser,registerUser}  

