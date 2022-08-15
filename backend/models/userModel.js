const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a Username"],
    },
    email: {
      type: String,
      require: [true, "Please add a Email"],
    },
    password: {
      type: String,
      require: [true, "Please add a Password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
