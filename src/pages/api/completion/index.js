export default async function handler(req, res) {
  if (req.method === "POST") {
    const prompt = req.body.prompt || "";

    if (!process.env.OPENAI_SECRET_KEY) {
      return res.status(500).json({error: {message: "Api key is not provided!"}});
    }

    if (prompt.trim().length === 0) {
      return res.status(400).json({error: {message: "Provide prompt value!"}});
    }

    try {
      const RESULT = "Just some hardcoded response bla bla bla...";

      return res.status(200).json({result: completion.data.choices[0].text});
    } catch (e) {
      return res.status(400).json({error: {message: e.message}});
    }

  } else {
    return res.status(500).json({error: {message: "Invalid Api Route!"}});
  }
}