const express = require("express");
const {
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const { isLogedin, isAdmin } = require("../middlewares/auth");
const expenseRouter = express.Router();

expenseRouter.post("/add-expense", isLogedin, isAdmin, createExpense);
expenseRouter.put("/update-expense", isLogedin, isAdmin, updateExpense);
expenseRouter.delete("/delete-expense", isLogedin, isAdmin, deleteExpense);
expenseRouter.get("/get-expense", isLogedin, getExpense);

module.exports = expenseRouter;
