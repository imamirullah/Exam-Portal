const mongoose = require("mongoose");

const examTimeSchema = new mongoose.Schema({
  duration: { type: Number, required: true }, // in minutes for example
});

module.exports = mongoose.model("ExamTime", examTimeSchema);
