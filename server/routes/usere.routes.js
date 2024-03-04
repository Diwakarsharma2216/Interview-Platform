const express = require('express');
const Userrouter = express.Router();
const UserController=require("../controller/user.controller")
const authorise = require('../middleware/authorise');
const authenticateMiddleware = require('../middleware/authMiddleware');

// Register a new user
Userrouter.post('/register', UserController.registerUser);

// otp verifican
Userrouter.post("/activate-User",UserController.activateUser)

// Login user
Userrouter.post('/login', UserController.loginUser);


// Logout user
Userrouter.post('/logout',UserController.logoutUser);

// Get current user
Userrouter.get('/current-user', UserController.getCurrentUser);

// get refresh token 
Userrouter.get("/refreshtoken",UserController.refreshtoken)

// get all user for ---admin only
Userrouter.get("/get-all-user",authenticateMiddleware,authorise(["admin"]),UserController.getuserById)


module.exports = Userrouter;