const {
  cloudinaryName,
  cloudinaryApi,
  cloudinarySecretKey,
} = require("../secret");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApi,
  api_secret: cloudinarySecretKey,
});

module.exports = cloudinary;
