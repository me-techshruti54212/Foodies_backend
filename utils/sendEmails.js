const nodemailer = require("nodemailer");

const sendEmail = async (email,otp) => {
    const msg = {
        from:process.env.MAIL,
        to:email, 
        subject:`${otp} for Foodies`,
        html:`
        <div class="otpDiv" style=" width:80%; margin:auto; padding:10px">
          <img src="https://foodies-backend-8h8p.onrender.com/images/foodieslogo2.png" />
            <h2 class="otpHead" style="color:#5C3F76;">Team Foodies</h2>
            <h3 style="margin-bottom:10px;">Thankyou for using Foodies</h3>
           <h1><b style="margin-bottom:20px; color:#5C3F76; font-size=30px;">${otp}</b></h1>
         
              <p>Otp is valid for 2 minutes. So, make sure to enter the otp within time or you will need to make a new request</p>
            
        </div>
        `,
    }
    //
   // 
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        service:"gmail",
        port:535,
        secure:true,
        auth:{
            user:process.env.MAIL,
            pass:process.env.PASS
        }
    })

    transporter.sendMail(msg, (err)=>{
        if(err){
            console.log(err)
            return false;
        }
        else{
            console.log("msg sent successfully")
            return true;
        }
    })
};

module.exports = sendEmail;