const { port } = require("./secret");
const connectDB = require("./config/db");
const app = require("./app");

app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Server is running at http://localhost:${port}`);
  } catch (error) {
    console.log("Failed to start server : ", error);
  }
});
