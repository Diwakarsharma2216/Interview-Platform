const express = require('express');
const interviewController = require('../controller/interview.controller');
const authenticateMiddleware = require('../middleware/authMiddleware');
const Interviewrouter = express.Router();


// Define interview routes
Interviewrouter.post('/start', authenticateMiddleware,interviewController.startInterview);
//Interviewrouter.put('/pause/:interviewId', interviewController.pauseInterview);
Interviewrouter.put('/complete/:interviewId', interviewController.completeInterview);

module.exports = Interviewrouter;
