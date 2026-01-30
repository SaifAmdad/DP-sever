const express = require("express");
const { addLillah, getLillah } = require("../controllers/lillahController");
const lillahRouter = express.Router();

lillahRouter.post("/add-lillah/:id", addLillah);
lillahRouter.get("/get-lillah/:id", getLillah);

module.exports = lillahRouter;
