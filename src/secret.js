require("dotenv").config();
const port = process.env.PORT;
const dbLink = process.env.DB_LINK;

module.exports = { port, dbLink };
