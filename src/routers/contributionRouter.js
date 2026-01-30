const express = require("express");
const {
  addContribution,
  getContributions,
} = require("../controllers/contributionController");
const contributionRouter = express.Router();

contributionRouter.post("/add-contrib/:id", addContribution);
contributionRouter.get("/get-contrib/:id", getContributions);

module.exports = contributionRouter;
