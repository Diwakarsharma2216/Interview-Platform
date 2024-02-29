const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  responses: [{ question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }, answer: String }],
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  score: { type: Number },
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
