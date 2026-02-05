const mongoose = require("mongoose");
const { dbLink } = require("../secret");

const connectDB = async () => {
  try {
    await mongoose.connect(dbLink);
    console.log(`DB connected successfully!`);
  } catch (error) {
    console.log(`DB couldn't connect ! `);
    console.log(error);
  }
};

module.exports = connectDB;
