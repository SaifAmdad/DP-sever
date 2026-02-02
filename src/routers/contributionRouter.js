const express = require("express");
const {
  addContribution,
  getContributions,
  getAllContributions,
} = require("../controllers/contributionController");
const { isLogedin } = require("../middlewares/auth");
const contributionRouter = express.Router();

contributionRouter.post("/add-contrib/:id", isLogedin, addContribution);
contributionRouter.get("/get-contrib/:id", isLogedin, getContributions);
contributionRouter.get("/get-contribs", getAllContributions);

module.exports = contributionRouter;
