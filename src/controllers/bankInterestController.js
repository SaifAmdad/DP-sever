const { bankInterestModel } = require("../models/fineModel");
const userModel = require("../models/userModel");

const addBankInterest = async (req, res) => {
  try {
    const { amount, type } = req.body;
    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Please full fill requierment",
      });
    }

    const newBankInterest = {
      amount,
      type,
    };
    const BankInterest = await bankInterestModel.create(newBankInterest);
    res.status(200).json({
      success: true,
      message: `Fin has been added successfully for `,
      payload: BankInterest,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getAllBankInterests = async (req, res) => {
  try {
    const allBankInterests = await bankInterestModel.find();
    const count = await bankInterestModel.find().countDocuments();
    res.status(200).send({
      success: true,
      message: `All ${count} BankInterest were returned successfully !`,
      payload: allBankInterests,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// const getBankInterests = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const allBankInterest = await bankInterestModel.find({ userId });
//     res.status(200).send({
//       success: true,
//       message: "BankInterests retured successfully !",
//       payload: allBankInterest,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const updatedBankInterest = async (req, res) => {
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

    const updatedExpense = await bankInterestModel.findByIdAndUpdate(
      id,
      updates,
      updateOptions,
    );

    res.status(200).send({
      success: true,
      message: "BankInterest updated successfully !",
      payload: updatedExpense,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteBankInterest = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await bankInterestModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "BankInterest deleted successfully !",
      payload: deleted,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addBankInterest,
  getAllBankInterests,
  updatedBankInterest,
  deleteBankInterest,
};
