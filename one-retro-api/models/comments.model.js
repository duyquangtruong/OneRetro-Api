const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      minlength: 1,
      required: true,
    },
    cardBelongTo: Schema.Types.ObjectId,
    createdAt: { type: Number, default: Date.now() },
    createdBy: Schema.Types.ObjectId, // user id
  },
  { versionKey: false }
);

module.exports = model("comments", commentSchema);
