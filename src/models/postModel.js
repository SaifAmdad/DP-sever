const { Schema, model } = require("mongoose");

const postSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const postModel = model("Post", postSchema);
module.exports = postModel;
