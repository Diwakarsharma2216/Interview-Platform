const openai = require('openai');
require("dotenv").config();

const openaiInstance = new openai({ key:"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" }); // Replace with your actual API key

const openaiService = {
  generateQuestion: async () => {
    const prompt = "hello, I am diwakar sharma";
    try {
      // Use the OpenAI API to generate a question based on a prompt
      const response = await openaiInstance.complete.create({
        model: 'text-davinci-003', // Use the appropriate model for your needs
        prompt,
        max_tokens: 100, // Adjust as needed
      });

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('OpenAI API error:', error.message);
      throw new Error('Failed to generate a question');
    }
  },

  evaluateResponse: async (prompt, userResponse) => {
    try {
      // Use the OpenAI API to evaluate the user's response
      const response = await openaiInstance.complete.create({
        model: 'text-davinci-003', // Use the appropriate model for your needs
        prompt: `${prompt}\nUser response: ${userResponse}\n`,
        max_tokens: 100, // Adjust as needed
      });

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('OpenAI API error:', error.message);
      throw new Error('Failed to evaluate the response');
    }
  },
};

module.exports = openaiService;
