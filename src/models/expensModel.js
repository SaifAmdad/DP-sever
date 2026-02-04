const { Schema, model } = require("mongoose");

const expenseSchema = Schema(
  {
    details: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);
const donationSchema = Schema(
  {
    details: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const expenseModel = model("Expense", expenseSchema);
const donationModel = model("Donation", donationSchema);
module.exports = { expenseModel, donationModel };
