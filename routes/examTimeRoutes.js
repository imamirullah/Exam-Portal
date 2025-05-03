const express = require("express");
const router = express.Router();
const examTimeController = require("../controllers/examTimeController");

router.post("/add", examTimeController.addExamTime);
router.put("/update", examTimeController.updateExamTime);
router.get("/get", examTimeController.getExamTime);

module.exports = router;
