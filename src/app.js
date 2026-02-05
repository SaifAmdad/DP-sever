const express = require("express");

const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("./routers/userRouter");
const contributionRouter = require("./routers/contributionRouter");
const { fineRouter, bankInterestRouter } = require("./routers/fineRouter");
const lillahRouter = require("./routers/lillahRouter");
const expenseRouter = require("./routers/expenseRouter");
const createError = require("http-errors");
const { errorResponse } = require("./controllers/response");

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -- testing --------
app.get("/", (req, res) => {
  res.status(200).send({
    name: "Dubai Properties",
    message: "Server is running ",
  });
});
// ----------

app.use("/api", userRouter);
app.use("/api", contributionRouter);
app.use("/api", fineRouter);
app.use("/api", bankInterestRouter);
app.use("/api", lillahRouter);
app.use("/api", expenseRouter);

// 404 error ======

app.use((req, res, next) => {
  next(createError(404, "Rout not found"));
});

// error handler

app.use((error, req, res, next) => {
  errorResponse(res, {
    statusCode: error.statusCode || error.status || 500,
    message: error.message || "Internal server Error",
  });
});

module.exports = app;
