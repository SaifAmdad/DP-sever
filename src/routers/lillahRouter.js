const express = require("express");
const {
  addLillah,
  getLillah,
  getAllLillah,
  updateLillah,
  deleteLillah,
} = require("../controllers/lillahController");
const { isLogedin, isAdmin } = require("../middlewares/auth");
const lillahRouter = express.Router();

lillahRouter.post("/add-lillah/:id", isLogedin, isAdmin, addLillah);
lillahRouter.put("/update-lillah/:id", isLogedin, isAdmin, updateLillah);
lillahRouter.delete("/delete-lillah/:id", isLogedin, isAdmin, deleteLillah);
lillahRouter.get("/get-lillah/:id", isLogedin, getLillah);
lillahRouter.get("/get-lillahs", isLogedin, getAllLillah);

module.exports = lillahRouter;
