const jwt = require("jsonwebtoken");

const timeLimitedJWT = (payload, secretKey, expiresIn) => {
  if (typeof payload !== "object" || !payload) {
    return false;
  }

  if (typeof secretKey !== "string" || secretKey == "" || !secretKey) {
    return false;
  }

  const token = jwt.sign({ payload }, secretKey, { expiresIn });
  return token;
};

const jwtForLogin = (payload, secretKey) => {
  if (typeof payload !== "object" || !payload) {
    return "Pass an object ";
  }

  if (typeof secretKey !== "string" || secretKey == "" || !secretKey) {
    return false;
  }

  const token = jwt.sign({ payload }, secretKey);
  return token;
};

module.exports = { timeLimitedJWT, jwtForLogin };
