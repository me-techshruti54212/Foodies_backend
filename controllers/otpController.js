const Otps = require('../models/otpModel');
const randomstring = require('randomstring');
const sendEmail = require('../utils/sendEmails');

// Generate OTP
function generateOTP() {
    return randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
}

// Send OTP to the provided email
exports.sendOTP = async (req, res, next) => {
    try {
        const { email } = req.body;
        const otp = generateOTP(); // Generate a 6-digit OTP
        const otpExpire = Date.now() + 120000;

        const otpModel = await Otps.updateOne({email},
            {
                $set: {
                    otp: otp,
                    expiry: otpExpire
                }
            }
        )

        if (otpModel.modifiedCount == 0) {
            await Otps.create({
                email: email,
                otp: otp,
                expiry: otpExpire
            })
        }

        // Send OTP via email
      sendEmail(email,otp)

        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Verify OTP provided by the user
exports.verifyOTP = async (req, res, next) => {
    try {       
        const { email,otp } = req.body;
        const emailOtp = await Otps.findOne({ email: email })
        if (!emailOtp)
            return res.json({success:false,message:"User not found with the given email"})
        if (emailOtp.otp != otp)
            return res.json({success:false,message:"OTP is invalid"})
        if (emailOtp.expiry <= Date.now())
            return res.json({success:false,message:"OTP expired"})

        await Otps.deleteOne({email})
        res.json({success:true,message:"OTP verified successfully"})

    } 
    catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
// exports.resendOTP = async (req, res, next) => {
//   try {
//     const { email } = req.body;
//     const existingOtp = await Otps.findOne({ email: email });

//     if (!existingOtp) {
//       return res.json({ success: false, message: 'User not found with the given email' });
//     }

//     if (existingOtp.expiry <= Date.now()) {
//       // OTP has expired, generate a new one
//       const newOtp = generateOTP();
//       const newOtpExpire = Date.now() + 120000;

//       await Otps.updateOne({ email }, {
//         $set: {
//           otp: newOtp,
//           expiry: newOtpExpire
//         }
//       });

//       // Send new OTP via email
//       sendEmail(email, newOtp);

//       res.json({ success: true, message: 'New OTP sent successfully' });
//     } 
//     else 
//     {
//       // OTP is still valid, resend the same OTP
//       sendEmail(email, existingOtp.otp);
//       res.json({ success: true, message: 'OTP resent successfully' });
//     }
//   } catch (error) {
//     console.error('Error resending OTP:', error);
//     res.status(500).json({ success: false, error: 'Internal server error' });
//   }
// };