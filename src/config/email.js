const nodemailer = require("nodemailer");
const { smtpUserName, smtpPassword } = require("../secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: smtpUserName,
    pass: smtpPassword,
  },
});

const emailWithNodemailer = async (emailData) => {
  try {
    const emailOption = {
      from: `Dubai-Properties ${smtpUserName}`, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    };
    const info = await transporter.sendMail(emailOption);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("an error auccerd while sending email", error);
    return error.message;
  }
};

module.exports = emailWithNodemailer;
