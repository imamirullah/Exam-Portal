const ExamTime = require("../models/ExamTime");

// ✅ Add time (only once)
const addExamTime = async (req, res) => {
  try {
    const existing = await ExamTime.findOne();
    if (existing) {
      return res.status(400).json({ message: "Time already set. Please update instead." });
    }

    const { duration } = req.body;
    const time = await ExamTime.create({ duration });
    res.status(200).json({ message: "Exam time added", time });
  } catch (error) {
    res.status(500).json({ error: "Failed to add exam time" });
  }
};

// ✅ Update time
const updateExamTime = async (req, res) => {
  try {
    const { duration } = req.body;
    const time = await ExamTime.findOneAndUpdate({}, { duration }, { new: true });

    if (!time) {
      return res.status(404).json({ message: "No existing time found to update" });
    }

    res.status(200).json({ message: "Exam time updated", time });
  } catch (error) {
    res.status(500).json({ error: "Failed to update exam time" });
  }
};

// ✅ Get time
const getExamTime = async (req, res) => {
  try {
    const time = await ExamTime.findOne();
    if (!time) {
      return res.status(404).json({ message: "No exam time set" });
    }
    res.status(200).json(time);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch exam time" });
  }
};

module.exports = { addExamTime, updateExamTime, getExamTime };
