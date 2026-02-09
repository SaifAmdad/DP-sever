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
      default: "Fine",
    },
  },
  { timestamps: true },
);
const bankInterestShema = Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      default: "Bank interest",
    },
  },
  { timestamps: true },
);
const fineModel = model("Fine", fineShema);
const bankInterestModel = model("BankInterest", bankInterestShema);
module.exports = { fineModel, bankInterestModel };
