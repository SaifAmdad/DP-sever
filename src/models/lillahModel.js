const { Schema, model, default: mongoose } = require("mongoose");

const lillahSchema = Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);
const lillahModel = model("Lillah", lillahSchema);
module.exports = lillahModel;
