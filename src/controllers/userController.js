const { jwtForLogin, timeLimitedJWT } = require("../config/jwt");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtLoginKey, jwtResetPasswordKey } = require("../secret");

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

// user Login =============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Full-fill credentials",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid credentialS",
      });
    }
    const userAuth = await bcrypt.compare(password, user.password);
    if (!userAuth) {
      return res.status(404).send({
        success: false,
        message: "Invalid credentialS",
      });
    }
    const authToken = jwtForLogin(user, jwtLoginKey);

    res.status(200).send({
      success: true,
      message: "Logedin successfully !",
      payload: authToken,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Get users =================================

const getUsers = async (req, res) => {
  try {
    const search = req.query.search || "";
    const limit = 50;
    const options = { password: 0 };
    const allUsers = await userModel.find();
    const usersCount = await userModel
      .find({}, options)
      .limit(limit)
      .countDocuments();

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

const getProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send({
      seccess: true,
      message: "Profile returned successfully !",
      payload: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// update user by ID ===================================
const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const getInfo = req.body;

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

// update user ===================================
const updateUser = async (req, res) => {
  try {
    const userId = req.user;
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
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(500).send({
        success: false,
        message: "Enter credential!",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found with this Email!",
      });
    }

    const token = timeLimitedJWT(user, jwtResetPasswordKey, "10m");
    res.status(200).send({
      success: true,
      message: "token has been sent successfully. valid for 10 minutes",
      payload: token,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// confirm Reset password -------
const confirmResetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const { newPassword } = req.body;

    const updateOptions = {
      new: true,
      runValidators: true,
    };

    const updates = {};

    const decoded = jwt.verify(token, jwtResetPasswordKey);
    if (!decoded) {
      return res.status(404).send({
        success: false,
        message: "User token cannot decoded!",
      });
    }
    updates.password = newPassword;
    console.log(decoded.payload._id);
    const updatedPassword = await userModel
      .findByIdAndUpdate(decoded.payload._id, updates, updateOptions)
      .select("-password -isAdmin");
    res.status(200).send({
      success: true,
      message: "Password updated successfully !",
      payload: updatedPassword,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Change Password =======================================

const changePassword = async (req, res) => {
  try {
    const token = req.header("token");
    const { newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Full-fill your credentials",
      });
    }

    const updateOptions = {
      new: true,
      runValidators: true,
    };

    const updates = {};

    const decoded = jwt.verify(token, jwtLoginKey);
    if (!decoded) {
      return res.status(404).send({
        success: false,
        message: "User token cannot decoded!",
      });
    }
    updateUser.password = newPassword;
    const updatedPassword = await userModel
      .findByIdAndUpdate(decoded.payload._id, updates, updateOptions)
      .select("-password -isAdmin");

    res.status(200).send({
      success: true,
      message: "Password updated successfully !",
      payload: updatedPassword,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getProfile,
  updateUserById,
  updateUser,
  resetPassword,
  loginUser,
  changePassword,
  confirmResetPassword,
};
