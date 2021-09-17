const jwt = require("jsonwebtoken");

module.exports.createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};

module.exports.verifyToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports.decodeToken = (token) => {
  return jwt.decode(token);
};
