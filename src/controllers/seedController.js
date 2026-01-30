const userModel = require("../models/userModel");

const seedUser = async (req, res, next) => {
  try {
    await userModel.deleteMany({});
    res.send({
      success: true,
      message: "seed successfull!",
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = seedUser;
