const express = require("express");
const router = express.Router();

// Controller Functions
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controller/goalController");

// Authorization Middleware
const { protect } = require("../middleware/authMiddleware");

// Routes
router.route("/").get(protect, getGoals).post(protect, setGoal);
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
