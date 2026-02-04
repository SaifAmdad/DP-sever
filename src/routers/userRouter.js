const express = require("express");
const {
  createUser,
  getUsers,
  updateUser,
  loginUser,
  resetPassword,
  confirmResetPassword,
  changePassword,
  updateUserById,
  getProfile,
} = require("../controllers/userController");
const seedUser = require("../controllers/seedController");
const { isLogedOut, isLogedin, isAdmin } = require("../middlewares/auth");
const userRouter = express.Router();

userRouter.post("/create-user", isLogedin, createUser);
userRouter.get("/get-users", isLogedin, isAdmin, getUsers);
userRouter.get("/get-profile", isLogedin, getProfile);
userRouter.put("/update-user-by-id/:id", isLogedin, isAdmin, updateUserById);
userRouter.put("/update-user", isLogedin, updateUser);
userRouter.post("/login", isLogedOut, loginUser);
userRouter.post("/reset-password", resetPassword);
userRouter.post("/confirm-reset-password/:token", confirmResetPassword);
userRouter.post("/change-password", isLogedin, changePassword);
userRouter.get("/seed", seedUser);
module.exports = userRouter;
