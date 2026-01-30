const express = require("express");
const { addFine, getFines } = require("../controllers/fineController");
const fineRouter = express.Router();
const bankInterestRouter = express.Router();

fineRouter.post("/add-fine/:id", addFine);
fineRouter.get("/get-fine/:id", getFines);
bankInterestRouter.post("/add-bank-interest", addFine);
bankInterestRouter.get("/add-bank-interest", getFines);

module.exports = { fineRouter, bankInterestRouter };
