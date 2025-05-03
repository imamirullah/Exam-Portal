const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  totalQuestions: { type: Number, default: 0 },
  totalAttempt: { type: Number, default: 0 },
  questionsWithAnswers: [
    {
      question: String,
      category: String, // "mcq" or "theory"
      correctAnswer: String,
      userAnswer: String
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
