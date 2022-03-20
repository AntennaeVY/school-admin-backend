const bcrypt = require("bcryptjs");

module.exports.encryptPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

module.exports.comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports.encodeBase64 = (string) => {
  return Buffer.from(string).toString("base64");
};

module.exports.decodeBase64 = (strBase64) => {
  return Buffer.from(strBase64, "base64").toString("ascii");
};
