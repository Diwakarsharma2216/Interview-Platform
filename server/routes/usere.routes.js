const express = require("express");
const Userrouter = express.Router();
<<<<<<< HEAD
const UserController = require("../controller/user.controller");
const authorise = require("../middleware/authorise");
const authenticateMiddleware = require("../middleware/authMiddleware");
=======
const UserController=require("../controller/user.controller")
const authorise = require('../middleware/authorise');
const authenticateMiddleware = require('../middleware/authMiddleware');
const passport = require('passport');
require('../config/passport'); 
>>>>>>> 44b08ddc7ad122871a5038f2ea45bbd7b304d48b

// Register a new user
Userrouter.post("/register", UserController.registerUser);

// otp verifican
Userrouter.post("/activate-User", UserController.activateUser);

// Login user
Userrouter.post("/login", UserController.loginUser);

// Logout user
Userrouter.post("/logout", UserController.logoutUser);

// Get current user
Userrouter.get("/current-user", UserController.getCurrentUser);

// get refresh token
Userrouter.get("/refreshtoken", UserController.refreshtoken);

// get all user for ---admin only
Userrouter.get(
  "/get-all-user",
  authenticateMiddleware,
  authorise(["admin"]),
  UserController.getuserById
);

<<<<<<< HEAD
module.exports = Userrouter;
=======


//passport js 


Userrouter.get('/', (req, res) => { 
    res.send("<button><a href='/user/auth'>Login With Google</a></button>") 
}); 
  
// Auth  
Userrouter.get('/auth' , passport.authenticate('google', { scope: 
    [ 'email', 'profile' ] 
})); 
  
// Auth Callback 
Userrouter.get( '/auth/callback', 
    passport.authenticate( 'google', { 
        successRedirect: 'callback/success', 
        failureRedirect: 'callback/failure'
})); 
  
// Success  
Userrouter.get('/auth/callback/success',UserController.googleAuth); 

  
// failure 
Userrouter.get('/auth/callback/failure' , (req , res) => { 
    res.send("Error"); 
});
  


module.exports = Userrouter;
>>>>>>> 44b08ddc7ad122871a5038f2ea45bbd7b304d48b
