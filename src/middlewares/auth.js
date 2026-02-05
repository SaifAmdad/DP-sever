const jwt = require("jsonwebtoken");
const { jwtLoginKey } = require("../secret");
const createError = require("http-errors");

const isLogedin = async (req, res, next) => {
  try {
    const header = req.header("Authorization")?.replace("Bearer ", "");
    const token = req.headers["token"];
    if (!token) {
      return next(createError(401, "Login required."));
    }
    const decoded = jwt.verify(token, jwtLoginKey);
    if (!decoded) {
      return next(createError(401, "Access dinied"));
    }

    req.user = decoded.payload;
    next();
  } catch (error) {
    return next(error);
  }
};

const isLogedOut = async (req, res, next) => {
  try {
    const header = req.header("Authorization")?.replace("Bearer ", "");
    const token = req.header("token");
    if (token) {
      return next(createError(409, "Already logedin"));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user.isAdmin) {
      return next(createError(403, "Admin only"));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { isLogedin, isLogedOut, isAdmin };
