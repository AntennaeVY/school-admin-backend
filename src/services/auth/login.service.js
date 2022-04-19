const { getOneByEmail } = require("../users/read.service");
const { comparePassword } = require("../../utils/encrypt");
const { createToken } = require("../../utils/token");
const { encodeBase64 } = require("../../utils/encrypt");

module.exports.login = async (email, password) => {
  const emailBase64 = encodeBase64(email);
  const user = await getOneByEmail(emailBase64, true);

  if (user) {
    const isPasswordValid = comparePassword(password, user.dataValues.password);

    if (isPasswordValid) {
      return {
        accessToken: createToken(user.toToken()),
        dni: user.dataValues.dni,
        role: user.dataValues.role
      };
    }
  }

  throw new Error("Invalid email/password");

};
