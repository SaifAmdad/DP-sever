const emailWithNodemailer = require("../config/email");
const contributionModel = require("../models/contributionModel");
const userModel = require("../models/userModel");

const addContribution = async (req, res, next) => {
  try {
    const months = [
      "One Time payment",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const { amount, month, year } = req.body;
    const userId = req.params.id;
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found with this ID",
      });
    }

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

    if (isExist) {
      return res.status(500).send({
        success: false,
        message: "Contribution already exist in this month !",
      });
    }

    const emailData = {
      email: user.email,
      subject: `[noReply] ${months[month]} - ${year} Contribution!`,
      html: `
      <h1>Hello Mr. ${user.name}</h1>
      <p>Your <span style="color: blue; font-size: 16px; background-color: lightgray; padding:5px"> AED : ${amount} </span> for ${months[month]}-${year}has been added successfully ! </p>
      `,
    };

    const newContribution = {
      userId,
      amount,
      month,
      year,
    };
    await contributionModel.create(newContribution);
    await emailWithNodemailer(emailData);
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

// Get all contributions ====================

const getAllContributions = async (req, res) => {
  const allContributions = await contributionModel.find();
  const contributionCount = await contributionModel.find().countDocuments();
  res.status(200).send({
    success: true,
    message: `All ${contributionCount} contributions were returned successfully !`,
    payload: allContributions,
  });
  console.log(allContributions);
};

module.exports = { addContribution, getContributions, getAllContributions };
