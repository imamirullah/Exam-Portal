const User = require("../models/User");

const registerUser = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, phone });
    }
    res.status(200).json({ message: "User logged in", user });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

const submitExam = async (req, res) => {
  const { email, totalQuestions, answersPayload } = req.body;  // Change from questionsWithAnswers to answersPayload

  try {
    if (!email || !Array.isArray(answersPayload)) {  // Check for answersPayload instead of questionsWithAnswers
      return res.status(400).json({ error: "Invalid payload or missing email" });
    }

    const totalAttempt = answersPayload.filter(a => a.userAnswer !== null).length;

    const user = await User.findOneAndUpdate(
      { email },
      {
        totalQuestions,
        totalAttempt,
        questionsWithAnswers: answersPayload  // Update this to save the payload as questionsWithAnswers
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User with this email does not exist" });
    }

    res.status(200).json({ message: "Exam submitted", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Submission Failed" });
  }
};




// ✅ New: Get all users (for admin)
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  };
  
// Controller change (optional improvement)
const deleteUser = async (req, res) => {
    const { email } = req.query; // get email from query param
  
    try {
      const user = await User.findOneAndDelete({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully", user });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  };
  


  module.exports = { registerUser, submitExam, getAllUsers, deleteUser };

