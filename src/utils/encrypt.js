const bcrypt = require("bcryptjs");

module.exports.encryptPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

module.exports.comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
