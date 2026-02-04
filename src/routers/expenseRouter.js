const express = require("express");
const { createExpense } = require("../controllers/expenseController");
const expenseRouter = express.Router();

expenseRouter.post("/add-expense", createExpense);

module.exports = expenseRouter;
