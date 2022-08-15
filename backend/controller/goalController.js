// ?@desc   Instead of Using TRY/CATCH
// ?@ OR .Catch in case of using .then
const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// *@desc    Get goals
// *@route   GET /api/goals
// ?@access  Private
const getGoals = asyncHandler(async (req, res) => {
  // Getting goal by req.user.id (from middleware)
  const goal = await Goal.find({ user: req.user.id });
  // response with all user goals
  res.json(goal);
});

// *@desc    Set goal
// *@route   POST /api/goals
// ?@access  Private
const setGoal = asyncHandler(async (req, res) => {
  // Checking for Body
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add Text");
  }

  // Creating Goal inside the DB
  // ? Data from request
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  // response with created goal object
  res.json(goal);
});

// *@desc    Update goal
// *@route   PUT /api/goals/:id
// ?@access  Private
const updateGoal = asyncHandler(async (req, res) => {
  // Get goal by req.params.id
  const goal = await Goal.findById(req.params.id);

  // Check if Goal Exists
  if (!goal) {
    res.status(400);
    throw new Error("Goal Not Found");
  }

  // Get the user
  const user = await User.findById(req.user.id);

  // Check if user Exists
  if (!user) {
    res.status(401);
    throw new Error("User not Found!");
  }

  // Check if the logged in user is the owner of the goal
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("Not Authorized, not your goals!");
  }

  // Update the Goal
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  // Response with updated goal object
  res.json(updatedGoal);
});

// *@desc    Delete goal
// *@route   DELETE /api/goals/:id
// ?@access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  // Get the goal
  const goal = await Goal.findById(req.params.id);

  // Check if Goals exists
  if (!goal) {
    res.status(401);
    throw new Error("Goal Not found!");
  }

  // Get the user
  const user = await User.findById(req.user.id);

  // Check if user exists
  if (!user) {
    res.status(401);
    throw new Error("User not Found");
  }

  // Check if logged in user is the owner of the goal
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("Not Authorized, dont ruin someone's goals!");
  }

  // Delete the Goal
  await goal.remove();

  // Response with goal id
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
