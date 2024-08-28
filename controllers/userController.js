const { userModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const axios = require("axios");
const mailer=require("../middlewares/mailer")
// Login user
const SECRET_KEY = "6Le7pwQqAAAAAAcac6Lzoubw9v-XK6uEge-qC79Y";
const loginUser = async (req, res) => {
  const { email, password, recaptcha } = req.body;
  try {
    const user = await userModel.findOne({ email });
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${recaptcha}`
    );
    if (!response.data.success) {
      return res.json({ success: false, message: "Invalid Captcha" });
    }

    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    }
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      message: "You have been loggedIn successfully.",
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error in login occured" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET);
};

// Register User
const registerUser = async (req, res) =>
{
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    const userexists = await userModel.findOne({ email });
    // const response = await axios.post(
    //   `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${recaptcha}`
    // );
    // if (!response.data.success) {
    //   console.log(response.data.success);
    //   return res.json({ success: false, message: "Invalid Captcha" });
    // }

   
    if (userexists) {
      return res.json({ success: false, message: "User already exists" });
    } 

    else {
      if (!validator.isEmail(email)) {
        return res.json({
          success: false,
          message: "Please enter valid email",
        });
      }
      if (password.length < 8) {
        return res.json({
          success: false,
          message: "Please enter a strong password",
        });
      }
      
      // hashing user pwd
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new userModel({
        name: name,
        email: email,
        password: hashedPassword,
      });
      const user = await newUser.save();
      // return res.json({
      //   message: "You are registered now.Login to continue.",
      //   signupsuccess: true,
      // });
      const token=createToken(user._id)
      res.json({success:true,token,message:"You have been successfully signed up."});
    }
  } catch (err) {
    console.log(err);
    res.json({ message: "Some error occured", success: "false" });
  }
};
const forgotPasswordUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User is not registered", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(token);
   mailer.sendMail(user._id,token,email)
   res.json({success:true,message:"Mail sent for password reset"})
  } catch (err) {
    console.log(err);
  }
};

const resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;
  console.log(req.params);
  try {
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return res.json({ success: false, message: "User not exists" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const idvalue = decode.id;
    console.log(idvalue);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await userModel.findByIdAndUpdate(
      { _id: idvalue },
      { password: hashedPassword }
    );
    return res.json({
      success: true,
      message: "Password Updated successfully",
    });
  } catch (Err) {
    console.log(Err);
    res.json({ success: false, message: "Invalid Token" });
  }
};

module.exports = { loginUser, registerUser, forgotPasswordUser, resetPassword };
