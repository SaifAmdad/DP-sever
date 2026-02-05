const express = require("express");
const {
  addContribution,
  getContributions,
  getAllContributions,
  updateContribution,
  deleteContribution,
} = require("../controllers/contributionController");
const { isLogedin, isAdmin } = require("../middlewares/auth");
const contributionRouter = express.Router();

contributionRouter.post(
  "/add-contrib/:id",
  isLogedin,
  isAdmin,
  addContribution,
);
contributionRouter.put(
  "/update-contrib/:id",
  isLogedin,
  isAdmin,
  updateContribution,
);
contributionRouter.delete(
  "/update-contrib/:id",
  isLogedin,
  isAdmin,
  deleteContribution,
);
contributionRouter.get("/get-contrib/:id", isLogedin, getContributions);
contributionRouter.get("/get-contribs", isLogedin, getAllContributions);

module.exports = contributionRouter;
