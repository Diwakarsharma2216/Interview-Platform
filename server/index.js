const express = require("express");

require("dotenv").config();
const cors = require("cors");

const app = express();

<<<<<<< HEAD
const Userrouter = require("./routes/usere.routes");
const authenticateMiddleware = require("./middleware/authMiddleware");
const authorise = require("./middleware/authorise");
const connectToDataBase = require("./config/db");
const Interviewrouter = require("./routes/interview.routes");
=======
const Userrouter = require('./routes/usere.routes');
const authenticateMiddleware = require('./middleware/authMiddleware');
const authorise = require('./middleware/authorise');
const connectToDataBase = require('./config/db');
const openaiService = require('./config/openaiService');
const Interviewrouter = require('./routes/interview.routes');
const cookieSession = require('cookie-session');
const passport = require('passport');
const session = require('express-session');
require('https').globalAgent.options.rejectUnauthorized = false;


const PORT = process.env.PORT || 3000;
>>>>>>> 44b08ddc7ad122871a5038f2ea45bbd7b304d48b

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

// // passport js part
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize()); 
app.use(passport.session()); 

// User Router
app.use("/user", Userrouter);

// Interview Router
app.use("/interview", Interviewrouter);

//  for test purpose
app.get("/test", authenticateMiddleware, authorise(["admin"]), (req, res) => {
  console.log("You can acces this code");
  res.send("You can acces this code");
});

app.listen(PORT, async () => {
  try {
    await connectToDataBase;
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
