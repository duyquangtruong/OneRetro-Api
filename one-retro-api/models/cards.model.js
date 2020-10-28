const { Schema, model } = require("mongoose");

const cardSchema = new Schema(
  {
    content: {
      type: String,
      minlength: 1,
      required: true,
    },
    numberOfLike: {
      type: Number,
    },
    boardBelongTo: Schema.Types.ObjectId,
    createdAt: { type: Number, default: Date.now() },
    createdBy: Schema.Types.ObjectId, // user id
  },
  { versionKey: false }
);

module.exports = model("cards", cardSchema);
