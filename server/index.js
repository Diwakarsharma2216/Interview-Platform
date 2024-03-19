const express = require("express");

require("dotenv").config();
const cors = require("cors");

const app = express();

const Userrouter = require("./routes/usere.routes");
const authenticateMiddleware = require("./middleware/authMiddleware");
const authorise = require("./middleware/authorise");
const connectToDataBase = require("./config/db");
const Interviewrouter = require("./routes/interview.routes");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

// // passport js part
// app.use(session({ secret: 'Diwakar sharma', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

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
