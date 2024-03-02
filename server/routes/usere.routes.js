const express = require('express');
const Userrouter = express.Router();
const {registerUser,loginUser,logoutUser,getCurrentUser, refreshtoken, activateUser, getuserById}=require("../controller/user.controller");
const authorise = require('../middleware/authorise');
const authenticateMiddleware = require('../middleware/authMiddleware');

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

// get all user for ---admin only
Userrouter.get("/get-all-user",authenticateMiddleware,authorise(["admin"]),getuserById)


module.exports = Userrouter;