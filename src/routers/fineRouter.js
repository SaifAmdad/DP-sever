const express = require("express");
const {
  addFine,
  getFines,
  getAllFines,
  updatedFine,
  deleteFine,
} = require("../controllers/fineController");
const { isLogedin, isAdmin } = require("../middlewares/auth");
const {
  addBankInterest,
  getAllBankInterests,
  deleteBankInterest,
  updatedBankInterest,
} = require("../controllers/bankInterestController");
const fineRouter = express.Router();
const bankInterestRouter = express.Router();

fineRouter.post("/add-fine/:id", isLogedin, isAdmin, addFine);
fineRouter.put("/update-fine/:id", isLogedin, isAdmin, updatedFine);
fineRouter.delete("/delete-fine/:id", isLogedin, isAdmin, deleteFine);
fineRouter.get("/get-fines/:id", isLogedin, getFines);
fineRouter.get("/get-all-fines", isLogedin, getAllFines);

bankInterestRouter.post(
  "/add-bank-interest",
  isLogedin,
  isAdmin,
  addBankInterest,
);
bankInterestRouter.put(
  "/update-bank-interest/:id",
  isLogedin,
  isAdmin,
  updatedBankInterest,
);
bankInterestRouter.delete(
  "/delete-bank-interest/:id",
  isLogedin,
  isAdmin,
  deleteBankInterest,
);
bankInterestRouter.get(
  "/get-bank-interest",
  isLogedin,
  isAdmin,
  getAllBankInterests,
);

module.exports = { fineRouter, bankInterestRouter };

// it should be updated
