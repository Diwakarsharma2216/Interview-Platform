const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/blacklistToken.model");
const UserModel = require("../models/user.model");
require('dotenv').config()
const authenticateMiddleware = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    // Check if the token is blacklisted
    const isTokenBlacklisted = await BlacklistToken.exists({ token });

    if (isTokenBlacklisted) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Token is blacklisted" });
    }

    // Verify the token
    const decodedToken = jwt.verify(token,  process.env.JWT_SECRET_KEY);
console.log( "decodedToken"  + decodedToken)
    // Check if the user associated with the token exists
    const user = await UserModel.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    req.user = user;

    next();

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = authenticateMiddleware;
