const express = require("express");
const router = express.Router();
const { registerUser, submitExam, getAllUsers, deleteUser } = require("../controllers/userController");

router.post("/login", registerUser);
router.post("/submit-exam", submitExam);
router.get("/all-users", getAllUsers);
router.delete("/delete-user", deleteUser);

module.exports = router; // ✅ This was missing
