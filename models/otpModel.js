const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiry:{
        type:Number
    }
});

const Otps = mongoose.model('otp',otpSchema);

module.exports = Otps;