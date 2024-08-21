const {OAuth2Client} = require('google-auth-library')
const axios=require("axios");

const OAuth=async(req,res)=>{
    async function getUserData(access_token){
        try {
            // console.log("hi")
            const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
            console.log("User Data Retrieved:", response.data);
            return response.data;
        } catch (err) {
            console.error("Error fetching user data:", err);
            throw err;
        }
    }
    const code=req.query.code;
    try{
        const redirectUrl="http://localhost:8000/oauth"
        const oAuth2Client=new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
    
        )
        const response=await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(response.tokens);
        console.log(response.tokens)
        console.log("Tokens Acquired");
        const user=oAuth2Client.credentials;
      const userdata=await getUserData(user.access_token);
res.json({user:userdata,success:true})

     

    }

    catch(err)
    {
        console.log("Error with signin");
        res.json({success:false,error:"Authentication failed"})
        
    }
}
module.exports={OAuth}