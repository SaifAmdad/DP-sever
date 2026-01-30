require("dotenv").config();
const port = process.env.PORT;
const dbLink = process.env.DB_LINK;
const bankInterestId = process.env.BANK_INTEREST;

module.exports = { port, dbLink, bankInterestId };
