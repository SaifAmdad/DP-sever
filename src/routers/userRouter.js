const express = require("express");
const {
  createUser,
  getUsers,
  updateUser,
  loginUser,
} = require("../controllers/userController");
const seedUser = require("../controllers/seedController");
const userRouter = express.Router();

userRouter.post("/create-user", createUser);
userRouter.get("/get-users", getUsers);
userRouter.put("/update-user/:id", updateUser);
userRouter.post("/login", loginUser);
userRouter.get("/seed", seedUser);
module.exports = userRouter;
