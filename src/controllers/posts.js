const emailWithNodemailer = require("../config/email");
const userModel = require("../models/userModel");

const sendNotification = async (req, res) => {
  try {
    const users = await userModel.find();
    let userEmails = [];
    const date = Date();
    users.map(async (user) => {
      const emailData = {
        email: user.email,
        subject: `[noReply] ${date.split(" ")[1]} Contribution!`,
        html: `
      <h1>Hello Mr. ${user.name}</h1>
      <p> <span style="color: black; font-weight:700; padding:5px"> Submit your contribution for ${date.split(" ")[1]}, if you didn't yet. ${date} </p>
      `,
      };
      userEmails.push(user.email);
      await emailWithNodemailer(emailData);
    });

    res.status(200).send({
      //   payload: users,
      emails: userEmails,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendNotification };
