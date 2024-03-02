const express = require('express');
const Userrouter = express.Router();
const {registerUser,loginUser,logoutUser,getCurrentUser, refreshtoken, activateUser}=require("../controller/user.controller")

// Register a new user
Userrouter.post('/register', registerUser);

// otp verifican
Userrouter.post("/activate-User",activateUser)

// Login user
Userrouter.post('/login', loginUser);


// Logout user
Userrouter.post('/logout',logoutUser);

// Get current user
Userrouter.get('/current-user', getCurrentUser);

// get refresh token 
Userrouter.get("/refreshtoken",refreshtoken)

module.exports = Userrouter;