const userModel = require("../models/userModel");

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, nominees } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(500).send({
        success: false,
        message: "Full fill required feild",
      });
    }

    const userExist = await userModel.exists({ email });

    if (userExist) {
      return res.status(500).send({
        success: false,
        message: "User already exist with this email!",
      });
    }

    const phoneExist = await userModel.exists({ phone });
    if (phoneExist) {
      return res.status(500).send({
        success: false,
        message: "User already exist with this Phone Number",
      });
    }
    const newUser = {
      name,
      email,
      password,
      phone,
      nominees,
    };
    await userModel.create(newUser);
    console.log("user created successfully!");
    res.status(201).send({
      success: true,
      payload: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get users =================================

const getUsers = async (req, res) => {
  try {
    const search = req.query.search || "";
    const limit = 5;
    const options = { password: 0 };
    console.log(options);
    const allUsers = await userModel.find({}, options).limit(limit);
    const usersCount = await userModel
      .find({}, options)
      .limit(limit)
      .countDocuments();
    console.log(usersCount);
    res.status(200).send({
      success: true,
      message: `All ${usersCount} users returned successfully !`,
      payload: allUsers,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createUser, getUsers };
