const express = require('express');
const Interviewrouter = express.Router();


// Define interview routes
Interviewrouter.post('/start', interviewController.startInterview);
Interviewrouter.put('/pause/:interviewId', interviewController.pauseInterview);
Interviewrouter.put('/complete/:interviewId', interviewController.completeInterview);

module.exports = Interviewrouter;
