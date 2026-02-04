const { donationModel, expenseModel } = require("../models/expensModel");

const createExpense = async (req, res) => {
  try {
    const { details, year, amount } = req.body;
    if (!details || !year || !amount) {
      res.status(500).send({
        success: false,
        message: "Full fill details !",
      });
    }
    const newExpense = {
      details,
      year,
      amount,
    };
    const donaion = await expenseModel.create(newExpense);
    res.status(200).send({
      success: true,
      message: "Donaion Created successfully !",
      payload: donaion,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// get expense ================================
const getExpense = async (req, res) => {
  try {
    const expenses = await expenseModel.find();
    res.status(200).send({
      success: true,
      message: "Expenses were returned successfully !",
      payload: expenses,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const getInfo = req.body;
    const updateOptions = {
      new: true,
      runValidatiors: true,
    };

    const updates = {};

    for (const key in getInfo) {
      if (getInfo[key] === "") {
        continue;
      }
      updates[key] = getInfo[key];
    }
    const updatedExpense = await expenseModel.findByIdAndUpdate(
      id,
      updates,
      updateOptions,
    );

    res.status(500).send({
      success: true,
      message: "Expense updated successfully !",
      payload: updatedExpense,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Delete =====================================
const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await expenseModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Expense deleted successfully !",
      payload: deleted,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Donation creation ================================

const createDonation = async (req, res) => {
  try {
    const { details, year, amount } = req.body;
    if (!details || !year || !amount) {
      res.status(500).send({
        success: false,
        message: "Full fill details !",
      });
    }
    const newDonaion = {
      details,
      year,
      amount,
    };
    const donaion = await donationModel.create(newDonaion);
    res.status(200).send({
      success: true,
      message: "Donation Created successfully !",
      payload: donaion,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// get expense ================================
const getDonation = async (req, res) => {
  try {
    const donation = await donationModel.find();
    res.status(200).send({
      success: true,
      message: "Donation were returned successfully !",
      payload: donation,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const updateDonation = async (req, res) => {
  try {
    const id = req.params.id;
    const getInfo = req.body;
    const updateOptions = {
      new: true,
      runValidatiors: true,
    };

    const updates = {};

    for (const key in getInfo) {
      if (getInfo[key] === "") {
        continue;
      }
      updates[key] = getInfo[key];
    }
    const updatedExpense = await donationModel.findByIdAndUpdate(
      id,
      updates,
      updateOptions,
    );

    res.status(500).send({
      success: true,
      message: "Donation updated successfully !",
      payload: updatedExpense,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Delete =====================================
const deleteDonation = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await donationModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Donation deleted successfully !",
      payload: deleted,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createExpense, updateExpense, getExpense, createDonation };
