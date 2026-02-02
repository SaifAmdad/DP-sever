const express = require("express");
const { addLillah, getLillah } = require("../controllers/lillahController");
const { isLogedin, isAdmin } = require("../middlewares/auth");
const lillahRouter = express.Router();

lillahRouter.post("/add-lillah/:id", isLogedin, isAdmin, addLillah);
lillahRouter.get("/get-lillah/:id", isLogedin, getLillah);

module.exports = lillahRouter;
