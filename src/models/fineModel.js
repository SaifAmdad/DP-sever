const { Schema, model, default: mongoose } = require("mongoose");

const fineShema = Schema(
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
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const fineModel = model("Fine", fineShema);
module.exports = fineModel;
