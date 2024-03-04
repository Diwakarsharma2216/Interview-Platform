const QuestionModel = require("../models/question.model");


const fetchQuestionsByTechnologyStack = async (technologyStack) => {
  try {
    // Fetch questions from the database based on the technology stack
    const questions = await QuestionModel.find({ technologyStack });

    if (!questions || questions.length === 0) {
      throw new Error('No questions found for the specified technology stack');
    }

    // Return an array of question IDs
    return questions.map(question => question._id);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch questions');
  }
};

module.exports = fetchQuestionsByTechnologyStack;
