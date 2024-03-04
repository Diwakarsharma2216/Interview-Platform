const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  technologyStack: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question', // Reference to the Question model
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
  // Add any other relevant fields here
});

const InterviewModel = mongoose.model('Interview', interviewSchema);

module.exports = InterviewModel;
