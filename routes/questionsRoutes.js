const express = require("express");
const router = express.Router();
const controller = require("../controllers/questionsController");

router.post("/add-mcq", controller.addMCQ);         // for MCQ
router.post("/add-theory", controller.addTheory);   // for Theory

router.get("/all", controller.getAllQuestions);
router.delete("/delete/:id", controller.deleteQuestion);
router.put("/update/:id", controller.updateQuestion);

module.exports = router;
