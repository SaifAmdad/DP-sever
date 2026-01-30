const mongoose = require("mongoose");
const { dbLink } = require("../secret");

const connectDB = () => {
  try {
    mongoose.connect(dbLink);
    console.log(`DB connected successfully!`);
  } catch (error) {
    console.log(`DB couldn't connect ! `);
    console.log(error);
  }
};

module.exports = connectDB;
