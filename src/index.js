const { port } = require("./secret");
const connectDB = require("./config/db");
const app = require("./app");

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  await connectDB();
});
