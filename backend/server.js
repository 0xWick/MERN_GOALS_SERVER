const { json, urlencoded } = require("express");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT;

// Connecting to MongoDB
connectDB();

const app = express();

// Necessary Middleware
app.use(express.json());
app.use(urlencoded({ extended: false }));

// Routes
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Error Handling Middleware
app.use(errorHandler);

// Start the Server
app.listen(PORT, "0.0.0.0", function () {
  console.log("Listening to port:  " + PORT);
});
