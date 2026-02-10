const cron = require("node-cron");
const { sendNotification } = require("../controllers/posts");

cron.schedule("39 23 10 * *", () => {
  sendNotification();
});

module.exports = cron;
