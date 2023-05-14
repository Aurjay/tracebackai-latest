import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });

    return;
  }

  const prompt_text = req.body.prompt_text || 'EU-AI-ACT';
  if (prompt_text.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt about EU-AI-ACT",
      }
    });

    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: generatePrompt(prompt_text),
      temperature: 0.6,
      max_tokens: 100,
    });

    const result = completion.data.choices[0].text;
    res.status(200).json({ result });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}



function generatePrompt(prompt_text) {
  const capitalized_prompt_text = prompt_text[0].toUpperCase() + prompt_text.slice(1).toLowerCase();

  return `Answer the following question about the EU-AI-ACT:

Q: ${capitalized_prompt_text}
A:`;
}
