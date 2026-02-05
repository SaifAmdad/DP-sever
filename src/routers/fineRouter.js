const express = require("express");
const { addFine, getFines } = require("../controllers/fineController");
const { isLogedin, isAdmin } = require("../middlewares/auth");
const fineRouter = express.Router();
const bankInterestRouter = express.Router();

fineRouter.post("/add-fine/:id", isLogedin, isAdmin, addFine);
fineRouter.get("/get-fine/:id", isLogedin, getFines);
bankInterestRouter.post("/add-bank-interest", isLogedin, isAdmin, addFine);
bankInterestRouter.get("/get-bank-interest", isLogedin, getFines);

module.exports = { fineRouter, bankInterestRouter };

// it should be updated
