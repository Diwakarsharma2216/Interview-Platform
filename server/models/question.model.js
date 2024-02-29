const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true },
  questionBank: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionBank', required: true },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
