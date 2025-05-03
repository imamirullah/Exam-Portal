const express = require("express");
require("dotenv").config(); 
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const questionRoutes = require("./routes/questionsRoutes");
const examTimeRoutes = require("./routes/examTimeRoutes");
const aiEvaluationRoutes = require("./routes/aiEvaluationRoutes");
 
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/ai", aiEvaluationRoutes);
app.use("/api/user", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/time", examTimeRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
