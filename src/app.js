const express = require("express");
const userRouter = require("./routers/userRouter");
const contributionRouter = require("./routers/contributionRouter");
const { fineRouter, bankInterestRouter } = require("./routers/fineRouter");
const lillahRouter = require("./routers/lillahRouter");
const app = express();

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

module.exports = app;
