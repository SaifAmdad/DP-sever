const { Schema, model } = require("mongoose");

const expenseSchema = Schema(
  {
    details: {
      type: String,
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
module.exports = expenseModel;
