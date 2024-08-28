const nodemailer = require("nodemailer")

const sendMail = async(userId, token,email) =>{

    const msg = {
        from:process.env.MAIL,
        to:email, 
        subject:`Reset Password for Foodies`,
        html:`
        <div class="otpDiv" style=" width:80%; margin:auto; padding:10px">
            <h2 class="otpHead" style="color:#5C3F76;">Team Foodies</h2>
            <h3 style="margin-bottom:10px;">Thankyou for using Foodies</h3>
            <p style="margin-bottom:20px;">A password reset event has been triggered. To complete the password reset process, click on the link below:</p>
         
             <p>http://localhost:5173/reset-password/${userId}/${token}</p>
            
        </div>
        `,
    }
    // <p>Otp is valid for 2 minutes. So, make sure to enter the otp within time or you will need to make a new request</p>
   // <h1><b style="margin-bottom:20px; color:#5C3F76; font-size=30px;">${otp}</b></h1>
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        service:"gmail",
        port:535,
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
}

module.exports ={
    sendMail
}

// const transporter = await nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: `${process.env.MAIL}`,
//       pass: `${process.env.PASS}`,
//     },
//   });

//   const mailOptions = {
//     from: `${process.env.MAIL}`,
//     to: `${email}`,
//     subject: "Reset Password",
//     html: `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Reset Your Password</title>
//   <style>
//       body {
//           font-family: Arial, sans-serif;
//           margin: 0;
//           padding: 0;
//           background-color: #f4f4f4;
//       }
//       .email-container {
//           max-width: 600px;
//           margin: 0 auto;
//           background-color: #ffffff;
//           padding: 20px;
//           border-radius: 10px;
//           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//       }
//       .header {
//           text-align: center;
//           padding: 10px 0;
//       }
//       .header img {
//           max-width: 150px;
//       }
//       .content {
//           padding: 20px;
//           text-align: center;
//       }
//       .content h1 {
//           color: #333333;
//       }
//       .content p {
//           color: #666666;
//       }
//       .reset-button {
//           display: inline-block;
//           margin: 20px 0;
//           padding: 10px 20px;
//           color: #ffffff;
//           background-color: #007bff;
//           text-decoration: none;
//           border-radius: 5px;
//       }
//       .footer {
//           text-align: center;
//           padding: 10px;
//           color: #999999;
//           font-size: 12px;
//       }
//   </style>
// </head>
// <body>
//   <div class="email-container">
    
//       <div class="content">
//           <h1>Reset Your Password</h1>
//           <p>We received a request to reset your password. Click the button below to reset it.</p>
//           <p>http://localhost:5173/reset-password/${user._id}/${token}</p>
//           <p>If you did not request a password reset, please ignore this email.</p>
//       </div>
//       <div class="footer">
//           <p>&copy; 2024 Your Company. All rights reserved.</p>
//       </div>
//   </div>
// </body>
// </html>`,
//   };

//   await transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//       return res.json({
//         success: false,
//         message: "Error occured in sending email . Please try again",
//       });
//     } else {
//       return res.json({
//         success: true,
//         message: "Email sent to the given mail to reset password",
//       });
//     }
//   });