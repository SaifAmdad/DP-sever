const { jwtForLogin, timeLimitedJWT } = require("../config/jwt");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtLoginKey, jwtResetPasswordKey } = require("../secret");
const cloudinary = require("../config/cloudinary");
const { imgPublicId } = require("../helper/cloudinaryHelper");
const createError = require("http-errors");
const { successResponse } = require("./response");

const createUser = async (req, res, next) => {
  try {
    const getInfo = req.body;
    const image = req.file?.path;

    if (
      !getInfo.name ||
      !getInfo.email ||
      !getInfo.password ||
      !getInfo.phone
    ) {
      return res.status(400).send({
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

    if (image) {
      const response = await cloudinary.uploader.upload(image, {
        folder: "Dubai-Properties/users",
      });
      getInfo.image = response.secure_url;
    }
    const user = await userModel.create(getInfo);
    const createdUser = await userModel
      .findById(user._id)
      .select("-password -isAdmin");
    res.status(201).send({
      success: true,
      message: "User was created successfully !",
      payload: createdUser,
    });
  } catch (error) {
    return next(error);
  }
};

// user Login =============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(createError(400, "Fill all credentials"));
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(createError(401, "Invalid credentials"));
    }
    const userAuth = await bcrypt.compare(password, user.password);
    if (!userAuth) {
      return next(createError(401, "Invalid credentials"));
    }
    const authToken = jwtForLogin(user, jwtLoginKey);

    res.status(200).json({
      success: true,
      message: "Logedin successfully !",
      payload: authToken,
    });
  } catch (error) {
    return next(error);
  }
};

// Get users =================================

const getUsers = async (req, res) => {
  try {
    const search = (req.query.search || "").trim();
    const filter = search
      ? {
          $or: [
            { name: new RegExp(search, "i") },
            { email: new RegExp(search, "i") },
            { phone: new RegExp(search, "i") },
          ],
        }
      : {};

    const options = { password: 0 };
    const allUsers = await userModel.find(filter, options);
    const usersCount = await userModel.find(filter, options).countDocuments();

    res.status(200).json({
      success: true,
      message: `All ${usersCount} users returned successfully !`,
      payload: allUsers,
    });
  } catch (error) {
    return next(error);
  }
};

const getProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      seccess: true,
      message: "Profile returned successfully !",
      payload: user,
    });
  } catch (error) {
    return next(error);
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

    await userModel.findByIdAndUpdate(userId, update, updateOptions);

    const updatedUser = await userModel.findById(user._id).select("-password");
    res.status(200).json({
      success: true,
      message: "update user",
      payload: updatedUser,
    });
  } catch (error) {
    return next(error);
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
    const user = await userModel.findById(userId._id, { password: 0 });

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
      update[key] = getInfo[key];
    }

    await userModel.findByIdAndUpdate(userId, update, updateOptions);
    const updatedUser = await userModel.findById(user._id).select("-password");
    res.status(200).send({
      success: true,
      message: "update user",
      payload: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
};
// Reset Password =======================================

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(createError(400, "Email is required"));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const token = timeLimitedJWT(user, jwtResetPasswordKey, "10m");
    res.status(200).json({
      success: true,
      message: "token has been sent successfully. valid for 10 minutes",
      payload: token,
    });
  } catch (error) {
    next(error);
  }
};

// confirm Reset password -------
const confirmResetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const { newPassword } = req.body;

    if (!newPassword) {
      return next(createError(400, "New Password required"));
    }

    const updateOptions = {
      new: true,
      runValidators: true,
    };

    const updates = {};

    const decoded = jwt.verify(token, jwtResetPasswordKey);
    if (!decoded) {
      return next(createError(401, "Invalid token"));
    }
    updates.password = newPassword;
    await userModel
      .findByIdAndUpdate(decoded.payload._id, updates, updateOptions)
      .select("-password -isAdmin");
    res.status(200).json({
      success: true,
      message: "Password updated successfully !",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

// Change Password =======================================

const changePassword = async (req, res) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;
    if (!token || !newPassword) {
      return next(createError(400, "New password required"));
    }

    const updateOptions = {
      new: true,
      runValidators: true,
    };

    const updates = {};

    updates.password = newPassword;
    await userModel
      .findByIdAndUpdate(user._id, updates, updateOptions)
      .select("-password -isAdmin");

    res.status(200).send({
      success: true,
      message: "Password updated successfully !",
      payload: {},
    });
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const existUser = await userModel.findById(id);
    if (!existUser) {
      return res.status(404).send({
        success: false,
        message: "user not found with this id",
      });
    }
    if (existUser.image !== "public/img/user/default.svg") {
      console.log(existUser.image);
      const publicID = await imgPublicId(existUser.image);
      await cloudinary.uploader.destroy(`Dubai-Properties/users/${publicID}`);
    }
    const deleted = await userModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "User deleted successfully !",
      payload: deleted,
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
  deleteUser,
};
