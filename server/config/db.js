const mongoose=require("mongoose")
require('dotenv').config()

const ConnectToDatabase=mongoose.connect(process.env.MONGODB_URL)

module.exports=ConnectToDatabase