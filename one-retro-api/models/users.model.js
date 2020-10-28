const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: {
      type: String,
      minlength: 1,
      maxlength: 255,
      required: true,
    },
    email: {
      type: String,
      maxlength: 50,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = model("users", userSchema);
