const jwt = require("jsonwebtoken");

const timeLimitedJWT = (payload, secretKey, expiresIn) => {
  if (typeof payload !== "object" || !payload) {
    return false;
  }

  if (typeof secretKey !== "string" || secretKey == "" || !secretKey) {
    throw false;
  }
  try {
    const token = jwt.sign({ payload }, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const jwtForLogin = (payload, secretKey) => {
  if (typeof payload !== "object" || !payload) {
    return "Pass an object ";
  }

  if (typeof secretKey !== "string" || secretKey == "" || !secretKey) {
    throw false;
  }
  try {
    const token = jwt.sign({ payload }, secretKey);
    return token;
  } catch (error) {
    console.error("Jwt error");
    return error.message;
  }
};

module.exports = { timeLimitedJWT, jwtForLogin };
