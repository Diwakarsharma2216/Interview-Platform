const bcrypt = require("bcrypt");
const ejs=require("ejs")
const path=require("path")
const UserModel = require("../models/user.model");
const BlacklistToken = require("../models/blacklistToken.model");
const jwt=require("jsonwebtoken");
const   sendMail  = require("../config/sendMail");
const CreateActivationToken = require("../config/otp");
require('dotenv').config()
// const passport=require("../config/passport")


const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user with the same username or email already exists
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    
    // Create a new user
    const user ={
      username,
      email,
      password,
    }

    // Save the user to the database
    const activationToken=CreateActivationToken(user)

    const activationCode=activationToken.activationCode

    // Email part 
    const data={user:{name:user.username},activationCode}

    const html=await ejs.renderFile(path.join(__dirname,"../mails/activation-mail.ejs"),data)
        try {
        await sendMail({
            email:user.email,
            subject:"Activation Email",
            template:"activation-mail.ejs",
            data
        })   
        
        res.status(201).json({
            success:true,
            message:`Please check your email ${user.email} to activate your account`,
            activationToken:activationToken
        })
        } catch (error) {
          res.status(500).json({ message: error.message });
        }



    // res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};




//  active the user

// const activateUser=async(req,res)=>{
//   try {
//       const {token,activationCode}=req.body 
//      const newUser1=jwt.verify(token,process.env.ACTIVATION_SECRET) 

//   if(newUser.activationCode!==activationCode){
//   return res.status(400).json({message:"Invalid activation code"})
//   }

//   const {name,email,password}=newUser.user
//   const existinguser=await UserModel.findOne({email})
// if(existinguser){
//   return next(new ErrorHandling("Email is al ready exsit",400))
// }


//  // Hash the password before saving it to the database
//  const hashedPassword = await bcrypt.hash(password, 10);
//  // Create a new user
//  const newUser = new UserModel({
//   username,
//   email,
//   password: hashedPassword,
// });

// // Save the user to the database
// await newUser.save();

// res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// }  


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_Key,
      { expiresIn: "1h" }
    );

    const refreshtoken = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET_Refresh_key, {
      expiresIn: 300
    });
    
    res.status(200).json({ token, userId: user._id, expiresIn: 3600,refreshtoken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Logout user
const logoutUser = async (req, res) => {
  try {
    const tokenToBlacklist = req.headers.authorization.split(" ")[1];
    // Add the token to the blacklist with an expiration time
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // You can adjust the expiration time as needed

    const blacklistToken = new BlacklistToken({
      token: tokenToBlacklist,
      expiresAt,
    });

    await blacklistToken.save();

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get current user
const getCurrentUser = (req, res) => {
  // If the user is authenticated, send user data; otherwise, send null
  res.status(200).json({ user: "under consruction" });
};


// refreshToken

let refreshtoken=(req,res)=>{
  const refreshtoken = req.headers.authorization?.split(" ")[1]
  const decoded=jwt.verify(refreshtoken,JWT_SECRET_Refresh_key)
  console.log(decoded)

  if(decoded){
      let token=jwt.sign({userId:decoded.userId,username:decoded.username},JWT_SECRET_key,{
          expiresIn: 60
        })
      return res.send(token)
    }
    else{
      res.send("invalid refresh token, plz login again")
    }

  }

module.exports = { registerUser, loginUser, getCurrentUser, logoutUser,refreshtoken };
