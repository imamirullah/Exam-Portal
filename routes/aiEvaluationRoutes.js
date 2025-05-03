const express = require("express");
const router = express.Router();
const { evaluateTheoryAnswers } = require("../controllers/aiEvaluationController");

router.post("/check-theory-answers", evaluateTheoryAnswers);

module.exports = router;
