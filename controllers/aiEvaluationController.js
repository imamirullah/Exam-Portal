const axios = require("axios");

const evaluateTheoryAnswers = async (req, res) => {
  try {
    const { theoryAnswers } = req.body;

    if (!Array.isArray(theoryAnswers) || theoryAnswers.length === 0) {
      return res.status(400).json({ error: "No answers provided" });
    }    

    const prompt = `
You are a strict technical examiner. Evaluate the student's theory answers.

Rules:
- ✅ Mark as correct ONLY if the answer is factually accurate and directly relevant.
- ❌ Mark as incorrect if it's vague, wrong, or partially incorrect.

Return ONLY this JSON format:
{
  "correctQuestions": [ { "question": "...", "answer": "..." }, ... ],
  "incorrectQuestions": [ { "question": "...", "answer": "..." }, ... ],
  "feedback": "Correct Answers: X, Incorrect Answers: Y"
}

Now evaluate the following:

${theoryAnswers.map((item, index) => {
  return `Q${index + 1}:\nQuestion: ${item.question}\nAnswer: ${item.answer}`;
}).join("\n\n")}
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3
      },
      {
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiText = response.data.choices[0].message.content;

    // Try to extract JSON safely
    const start = aiText.indexOf("{");
    const end = aiText.lastIndexOf("}");
    const jsonString = aiText.slice(start, end + 1);

    const parsed = JSON.parse(jsonString);

    res.json(parsed);

  } catch (err) {
    console.error("Groq AI Evaluation Error:", err.message);
    res.status(500).json({ error: "Groq AI failed to evaluate answers" });
  }
};

module.exports = { evaluateTheoryAnswers };
