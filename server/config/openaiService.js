const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const openaiService = {
 
  generateQuestion:async (prompt) => {
    try {
    
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {role:"assistant",content:`${prompt}`}
        ]
      })
      const generatedQuestion = completion.data.choices[0];
        //  console.log(generatedQuestion)
      return generatedQuestion
    } catch (error) {
      console.error('OpenAI API error:', error.message);
      
    }
  },

  evaluateResponse: async (req, res) => {
    try {
      const { prompt, userResponse } = req.body;
      const response = await openai.complete.create({
        model: "text-davinci-003",
        prompt: `${prompt}\nUser response: ${userResponse}\n`,
        max_tokens: 100,
      });
  
      const evaluatedResponse = response.data.choices[0].text.trim();
      
       return evaluatedResponse 
    } catch (error) {
      console.error('OpenAI API error:', error.message);
      
    }
  }
}

module.exports = openaiService;
