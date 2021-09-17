const { getOneByEmail } = require("../users/read.service");
const { comparePassword } = require("../../utils/encrypt");
const { createToken } = require("../../utils/token");

module.exports.login = async (email, password) => {
  const user = await getOneByEmail(email);

  if (!user) {
    throw new Error("Invalid email/password");
  }

  const isPasswordValid = comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email/password");
  }

  return createToken(user.toJSON());
};
