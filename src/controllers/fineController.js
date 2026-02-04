const fineModel = require("../models/fineModel");
const userModel = require("../models/userModel");
const { bankInterestId } = require("../secret");

const addFine = async (req, res) => {
  try {
    let userId = req.params.id;
    const { amount, type } = req.body;
    if (!amount || !type) {
      return res.status(500).send({
        success: false,
        message: "Please full fill requierment",
      });
    }
    if (!userId) {
      const newBankInterest = {
        userId: bankInterestId,
        amount,
        type,
      };

      console.log(bankInterestId);
      await fineModel.create(newBankInterest);
      return res.status(200).send({
        success: true,
        message: "Bank interest has been added successfully!",
      });
    }
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found with this id !",
      });
    }
    const newFine = {
      userId,
      amount,
      type,
    };
    const fine = await fineModel.create(newFine);
    res.send({
      success: true,
      message: `Fin has been added successfully for ${user.name}`,
      payload: fine,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getAllFines = async (req, res) => {
  try {
    const allFines = await fineModel.find();

    res.status(500).send({
      success: true,
      message: "Donation updated successfully !",
      payload: allFines,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getFines = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      const allFine = await fineModel.fine({ userId: bankInterestId });
      return res.status(200).send({
        success: true,
        message: "Bank interest were retured successfully !",
        payload: allFine,
      });
    }
    const allFine = await fineModel.fine({ userId });
    res.status(200).send({
      success: true,
      message: "Fines retured successfully !",
      payload: allFine,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const updatedFine = async (req, res) => {
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
    const updatedExpense = await fineModel.findByIdAndUpdate(
      id,
      updates,
      updateOptions,
    );

    res.status(500).send({
      success: true,
      message: "Fine updated successfully !",
      payload: updatedExpense,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteFine = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await fineModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Fine deleted successfully !",
      payload: deleted,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addFine, getFines, getAllFines, updatedFine, deleteFine };
