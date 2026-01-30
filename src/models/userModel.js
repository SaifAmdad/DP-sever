// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
// });

const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
      minlength: [4, "Minimum length is 4."],
      maxlength: [30, "Maximum length is 30."],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: (v) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Invalid email address format",
      },
    },
    password: {
      type: String,
      required: true,
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(13)),
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    nid: {
      type: String,
      // required: true,
    },
    image: {
      type: String,
      default: "public/img/user/default.svg",
    },
    address: {
      type: String,
      // required: true,
    },
    presentAddress: {
      type: String,
      // required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    nominees: {
      name: {
        type: String,
        // required: true,
        default: "nominee name",
        trim: true,
      },
      nid: {
        type: String,
        // required: true,
        default: "nominee ID",
      },
      phone: {
        type: String,
        // required: true,
        default: "Phone",
      },
    },
  },
  { timestamps: true },
);

const userModel = model("User", userSchema);

module.exports = userModel;
