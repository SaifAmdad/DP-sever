const { Schema, model, default: mongoose } = require("mongoose");

const contributionSchema = Schema(
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
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number, //using 1-12
      required: true,
    },

    type: {
      type: String,
      default: "Cash",
      trim: true,
    },
  },
  { timestamps: true },
);
// contributionSchema.index(
//   {
//     user: 1,
//     year: 1,
//     month: 1,
//   },
//   { unique: true },
// );

const contributionModel = model("Contribution", contributionSchema);
module.exports = contributionModel;
