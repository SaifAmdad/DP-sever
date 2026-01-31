require("dotenv").config();
const port = process.env.PORT;
const dbLink = process.env.DB_LINK;
const bankInterestId = process.env.BANK_INTEREST;

const smtpUserName = process.env.SMTP_USER_NAME;
const smtpPassword = process.env.SMTP_PASSWORD;

const jwtLoginKey = process.env.JWT_LOGIN_KEY;
const jwtResetPasswordKey = process.env.JWT_RESTPASWORD_KEY;

module.exports = {
  port,
  dbLink,
  bankInterestId,
  smtpUserName,
  smtpPassword,
  jwtLoginKey,
  jwtResetPasswordKey,
};
