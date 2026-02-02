const jwt = require("jsonwebtoken");
const { jwtLoginKey } = require("../secret");

const isLogedin = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) {
      return res.status(400).send({
        success: false,
        message: "Token not found. login first !",
      });
    }
    const decoded = jwt.verify(token, jwtLoginKey);
    if (!decoded) {
      return res.status(400).send({
        success: false,
        message: "Access dinied !",
      });
    }

    req.user = decoded.payload;
    next();
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const isLogedOut = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (token) {
      return res.status(505).send({
        success: false,
        message: "You are already logedin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user.isAdmin);
    if (!user.isAdmin) {
      return res.status(500).send({
        success: false,
        message: "You are not an Admin.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { isLogedin, isLogedOut, isAdmin };
