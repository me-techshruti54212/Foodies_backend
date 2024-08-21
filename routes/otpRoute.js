const express = require('express');
const { sendOTP, verifyOTP, resendOTP } = require('../controllers/otpController');

const router = express.Router();

router.post('/sendOTP', sendOTP);
router.post('/verifyOTP', verifyOTP);
// router.post("/resendOTP",resendOTP)

module.exports = router;