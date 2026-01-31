const express = require("express");
const {
  addContribution,
  getContributions,
  getAllContributions,
} = require("../controllers/contributionController");
const contributionRouter = express.Router();

contributionRouter.post("/add-contrib/:id", addContribution);
contributionRouter.get("/get-contrib/:id", getContributions);
contributionRouter.get("/get-contribs", getAllContributions);

module.exports = contributionRouter;
