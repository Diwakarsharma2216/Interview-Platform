const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  technologyStack: {
    type: String,
    required: true,
  },
  questions: [],
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  }, 
  
});

const InterviewModel = mongoose.model("Interview", interviewSchema);

module.exports = InterviewModel;
