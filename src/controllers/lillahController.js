const emailWithNodemailer = require("../config/email");
const lillahModel = require("../models/lillahModel");
const userModel = require("../models/userModel");

const addLillah = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.params.id;

    // ---------------------
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found with this ID",
      });
    }
    // -------------------------

    const newLillah = {
      userId,
      amount,
    };

    // ---------------------------

    const emailData = {
      email: user.email,
      subject: `[noReply] Lillah-Fund !`,
      html: `
      <h1>Hello Mr. ${user.name}</h1>
      <p>Your <span style="color: blue; font-weight:700; padding:5px"> AED : ${amount} </span> for <span style="color: blue; font-weight:700; padding:5px">Lillah-Fund </span>  has been added successfully ! </p>
      `,
    };
    // ---------------------------

    const lillah = await lillahModel.create(newLillah);
    await emailWithNodemailer(emailData);
    res.status(200).send({
      success: true,
      message: "Lillah fund added seccessfully !",
      payload: lillah,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getLillah = async (req, res) => {
  try {
    const userId = req.params.id;
    const allLillah = await lillahModel.find({ userId });
    const count = await lillahModel.find({ userId }).countDocuments();
    res.status(200).send({
      success: true,
      message: `${count} lillah funds were returned successfully !`,
      payload: allLillah,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getAllLillah = async (req, res) => {
  try {
    const allLillah = await lillahModel.find();
    const count = await lillahModel.find().countDocuments();

    res.status(200).send({
      success: true,
      message: `All ${count} Lillah were returned successfully !`,
      payload: allLillah,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
const updateLillah = async (req, res) => {
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
    const updateLillah = await lillahModel.findByIdAndUpdate(
      id,
      updates,
      updateOptions,
    );

    res.status(500).send({
      success: true,
      message: "Donation updated successfully !",
      payload: updateLillah,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteLillah = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await lillahModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Lillah deleted successfully !",
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
  addLillah,
  getLillah,
  getAllLillah,
  updateLillah,
  deleteLillah,
};
