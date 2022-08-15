const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// *@desc    Register New User
// *@route   POST /api/users
// ?@access  Public
const registerUser = asyncHandler(async (req, res) => {
  // Getting Data from Body
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Provide all fields");
  }

  // Duplicate User Check
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Creating the User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // ? If User created, response with user data
  // ? else: Error
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// *@desc    Authenticate User
// *@route   POST /api/users/login
// ?@access  Private
const loginUser = asyncHandler(async (req, res) => {
  // Get data from req.body
  const { email, password } = req.body;

  // Get user by email (from req.body)
  const user = await User.findOne({ email });

  // ? Checking if "User Exists" and "Password is Correct"
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// *@desc    Get User Info
// *@route   GET /api/users/me
// ?@access  Private
const getMe = asyncHandler(async (req, res) => {
  // Get data by req.user.id (from middleware)
  const { _id, name, email } = await User.findById(req.user.id);

  // Response with user data as Object
  res.status(200).json({
    id: _id,
    name: name,
    email: email,
  });
});

// ** Generating JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
