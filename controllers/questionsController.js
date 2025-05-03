const Question = require("../models/questions");

// ✅ Add MCQ
// ✅ Add MCQ (customId removed)
exports.addMCQ = async (req, res) => {
  try {
    const { question, option1, option2, option3, option4, answer } = req.body;

    const newQ = new Question({
      category: "mcq",
      question,
      option1,
      option2,
      option3,
      option4,
      answer
    });

    await newQ.save();
    res.status(201).json({ message: "MCQ added", question: newQ });
  } catch (err) {
    console.error("Error adding MCQ:", err);
    res.status(500).json({ error: "Failed to add MCQ" });
  }
};


// ✅ Add Theory
// ✅ Add Theory (without customId)
exports.addTheory = async (req, res) => {
  try {
    const { question } = req.body;

    const newQ = new Question({
      category: "theory",
      question
    });

    await newQ.save();
    res.status(201).json({ message: "Theory question added", question: newQ });
  } catch (err) {
    console.error("Error adding Theory:", err);
    res.status(500).json({ error: "Failed to add theory question" });
  }
};


// ✅ Get All (MCQ + Theory)
exports.getAllQuestions = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = {};
    if (category === "mcq" || category === "theory") {
      filter.category = category;
    }

    const questions = await Question.find(filter).sort({ customId: 1 });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};


// ✅ Delete by ID
exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.status(200).json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete question" });
  }
};

// ✅ Update by ID
exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Question.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Question updated", question: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update question" });
  }
};
