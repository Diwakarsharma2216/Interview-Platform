const mongoose=require("mongoose")
require('dotenv').config()



const connectToDataBase =mongoose.connect(process.env.MONGODB_URL)
module.exports = connectToDataBase