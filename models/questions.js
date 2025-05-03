const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  customId: { type: Number, unique: true }, // auto incremented ID
  category: { type: String, enum: ["mcq", "theory"], required: true },
  question: { type: String, required: true },

  // MCQ-specific fields
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  answer: String,

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Question", questionSchema);
