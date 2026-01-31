const userModel = require("../models/userModel");

const createUser = async (req, res, next) => {
  try {
    const getInfo = req.body;

    if (
      !getInfo.name ||
      !getInfo.email ||
      !getInfo.password ||
      !getInfo.phone
    ) {
      return res.status(500).send({
        success: false,
        message: "Full fill required feild",
      });
    }

    const userExist = await userModel.exists({ email: getInfo.email });

    if (userExist) {
      return res.status(500).send({
        success: false,
        message: "User already exist with this email!",
      });
    }

    const phoneExist = await userModel.exists({ phone: getInfo.phone });
    if (phoneExist) {
      return res.status(500).send({
        success: false,
        message: "User already exist with this Phone Number",
      });
    }
    await userModel.create(getInfo);
    res.status(201).send({
      success: true,
      message: "User was created successfully !",
      payload: getInfo,
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

// update user ===================================
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const getInfo = req.body;
    if (getInfo.email || getInfo.phone || getInfo.password) {
      return res.send({
        success: false,
        message: "you cannot change email and phone",
      });
    }
    const updateOptions = {
      new: true,
      runValidators: true,
      context: "query",
    };
    let update = {};
    const user = await userModel.findById(userId, { password: 0 });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found with this ID",
      });
    }

    for (let key in getInfo) {
      if (getInfo[key] === "") {
        continue;
      }
      console.log(getInfo[key]);
      update[key] = getInfo[key];
    }

    const userUpdate = await userModel
      .findByIdAndUpdate(userId, update, updateOptions)
      .select("-password");
    console.log(userUpdate);
    res.send({
      success: true,
      message: "update user",
      payload: update,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Reset Password =======================================

const resetPassword = async (req, res) => {
  console.log("reset Password");
};

module.exports = { createUser, getUsers, updateUser, resetPassword };
