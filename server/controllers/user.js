const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc   signup to user
// route   POST /api/user/signup
// access  Public
exports.signup = async (req,res) => {
    try {
      const { userName, email, password, confirmPassword} = req.body;
  
      // validations on data
      if (
        !userName ||
        !email ||
        !password ||
        !confirmPassword 
      ) {
        return res.status(500).json({
          success: false,
          message: "please fill all details",
        });
      }

      // check passwords are matched
      if (password !== confirmPassword) {
          return res.status(500).json({
            success: false,
            message: "password not matched",
          });
      }
  
      // check user already exist or not
      const existUser = await User.findOne({ email });
      if (existUser) {
        return res.status(500).json({
          success: false,
          message: "user already exist",
        });
      }
  
      // hash password
      const hashPassword = await bcrypt.hash(password, 10);
  
      // create user and save into DB
      const user = await User.create({
          userName,
          email,
          password:hashPassword,
          image:`https://api.dicebear.com/5.x/initials/svg?seed=${userName}`,
      })
      
      return res.status(200).json({
          success: true,
          message: "SignUp successful",
          user,
      })
  
    } catch (error) {
      return res.status(500).json({
          success: false,
          message: "error in sign up",
          error:error.message,
      });
    }
};

// @desc   login to user
// route   POST /api/user/login
// access  Public
exports.login = async (req,res) => {
    try {
      const {email, password} = req.body;
      
      // validations on data
      if (
        !email ||
        !password 
      ) {
        return res.status(500).json({
          success: false,
          message: "please fill all details",
        });
      }
  
      // check user exist or not
      const user = await User.findOne({email:email});
      if(!user){
        return res.status(500).json({
            success: false,
            message: "invalid user email",
        });
      }

      // check passwords are matched or not
      if(await bcrypt.compare(password,user.password)){
        // create jwt token
        let payload = {
            id: user._id,
            email: user.email,
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{
            expiresIn:"1d",
        })

        // remove password
        user.password = null;
        
        res.cookie("token", token, {
            secure:true,
            httpOnly:true,
            expires: new Date (Date.now() + 60 * 60 * 24 * 1000),

        }).status(200).json({
            success: true,
            user,
            message: "Login successful",
        });
      }
      else{
        return res.status(500).json({
            success: false,
            message: "password not matched",
        });
      }
    } catch (error) {
      return res.status(500).json({
          success: false,
          message: "error in login",
          error:error.message,
      });
    }
};

  