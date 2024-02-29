const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  interview: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview', required: true },
  score: { type: Number, required: true },
  feedback: { type: String },
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
