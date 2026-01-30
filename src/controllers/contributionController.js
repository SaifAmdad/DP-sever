const contributionModel = require("../models/contributionModel");

const addContribution = async (req, res, next) => {
  try {
    const { amount, month, year } = req.body;
    const userId = req.params.id;

    if (!amount || !month || !year) {
      return res.status(500).send({
        success: false,
        message: "Full fill required feild",
      });
    }
    const isExist = await contributionModel.findOne({
      userId,
      year,
      month,
    });
    console.log(isExist);
    if (isExist) {
      return res.status(500).send({
        success: false,
        message: "Contribution already exist !",
      });
    }

    const newContribution = {
      userId,
      amount,
      month,
      year,
    };
    await contributionModel.create(newContribution);
    res.status(200).send({
      success: true,
      message: "Contribution added successfully !",
      payload: newContribution,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// get contributions by userId ==========

const getContributions = async (req, res) => {
  try {
    console.log("get contributions by id");
    const userId = req.params.id;
    if (!userId) {
      res.status(404).send({
        success: false,
        message: "user ID not found !",
      });
    }
    const contributions = await contributionModel.find({ userId });
    const contributionCount = await contributionModel
      .find({ userId })
      .countDocuments();
    res.status(200).send({
      success: true,
      message: `${contributionCount} contributions were returned successfully !`,
      payload: contributions,
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { addContribution, getContributions };
