const express = require('express');
const ConnectToDatabase = require('./config/db');
require('dotenv').config()
const cors = require('cors');
const session = require('express-session');
const app = express();
const passport=require("./config/passport");
const Userrouter = require('./routes/usere.routes');
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

// // passport js part
// app.use(session({ secret: 'Diwakar sharma', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// User Router
app.use("/user",Userrouter)

app.listen(PORT,async()=>{
    try {
        await ConnectToDatabase
        console.log(`Server running on port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})
