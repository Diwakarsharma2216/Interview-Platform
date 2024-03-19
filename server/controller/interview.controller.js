
const openaiService = require('../config/openaiService');
const InterviewModel = require('../models/interview.model');
const { ObjectId } = require('mongoose').Types;

const interviewController = {
  startInterview: async (req, res) => {
    try {
      const { userId, technologyStack } = req.body;

      // Generate a question related to the technology stack using OpenAI
      const prompt = `Generate a question related to ${technologyStack} give me 10 question in form of array`;
      const generatedQuestion = await openaiService.generateQuestion(prompt);

      const startTime = new Date();
      const newInterview = new InterviewModel({
        userId,
        technologyStack,
        questions: [{ question: generatedQuestion }],
        startTime,
      });

      const savedInterview = await newInterview.save();

      res.status(201).json(savedInterview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  
  },


  completeInterview: async (req, res) => {
    try {
      const { interviewId } = req.params;

      // Validate if interviewId is a valid ObjectId
      if (!ObjectId.isValid(interviewId)) {
        return res.status(400).json({ error: 'Invalid interviewId format' });
      }

      // Find the interview in the database and update the endTime
      const updatedInterview = await InterviewModel.findByIdAndUpdate(
        interviewId,
        { endTime: new Date() },
        { new: true }
      );

      if (!updatedInterview) {
        return res.status(404).json({ error: 'Interview not found' });
      }

      res.status(200).json(updatedInterview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  evaluateResponse: async (req, res) => {
    try {
      const { prompt, userResponse } = req.body;

      // Use the OpenAI service to evaluate the user's response
      const evaluatedResponse = await openaiService.evaluateResponse(prompt, userResponse);

      res.status(200).json({ evaluation: evaluatedResponse });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
}


module.exports = interviewController;
