const express = require('express');
const ConnectToDatabase = require('./config/db');
require('dotenv').config()
const cors = require('cors');

const app = express();

const Userrouter = require('./routes/usere.routes');
const authenticateMiddleware = require('./middleware/authMiddleware');
const authorise = require('./middleware/authorise');

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

// // passport js part
// app.use(session({ secret: 'Diwakar sharma', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// User Router
app.use("/user",Userrouter)

//  for test purpose

app.get("/test",authenticateMiddleware,authorise(["admin"]),(req,res)=>{
    console.log("You can acces this code")
    res.send("You can acces this code")
})



app.listen(PORT,async()=>{
    try {
        await ConnectToDatabase
        console.log(`Server running on port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})
