const { Schema, model } = require("mongoose");

const boardSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 1,
      maxlength: 255,
      required: true,
    },
    description: {
      type: String,
      maxlength: 255,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    createdBy: {
      type: Schema.Types.ObjectId,
    },
  },
  { versionKey: false }
);

module.exports = model("boards", boardSchema);
