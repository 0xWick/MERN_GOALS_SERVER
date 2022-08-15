const express = require("express");
const router = express.Router();

// Controller Functions
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controller/userController");

// Authorization Middle ware
const { protect } = require("../middleware/authMiddleware");

// Routes
router.post("/", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

module.exports = router;
