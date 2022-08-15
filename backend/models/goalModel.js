const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    // ?@ Reference to the User Model
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // *@ Actual Goal Schema
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
