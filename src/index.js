const express = require("express");
const { port } = require("./secret");
const connectDB = require("./db/db");
const app = express();

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  await connectDB();
});
