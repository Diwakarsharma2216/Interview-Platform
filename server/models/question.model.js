const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  technologyStack: {
    type: String,
    required: true,
  },
  // You can add more fields as needed, such as difficulty level, category, etc.
});

const QuestionModel = mongoose.model('Question', questionSchema);

module.exports = QuestionModel;
