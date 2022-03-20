const User = require("../../models/user.model");
const { decodeBase64 } = require("../../utils/encrypt");

module.exports.getAllUsers = async () => {
  const users = await User.findAll();

  users.map((user) => {
    newUser = user?.toJSON();
    return newUser;
  });

  return users;
};

module.exports.getOneById = async (id, hasPass = false) => {
  if (!id) {
    throw new Error("Id must be provided");
  }

  const user = (
    await User.findAll({
      where: {
        _id: id,
      },
    })
  )[0];

  try {
    return hasPass ? user : user.toJSON();
  } catch (e) {
    return null;
  }
};

module.exports.getOneByEmail = async (emailBase64, hasPass = false) => {
  if (!emailBase64) {
    throw new Error("Email must be provided");
  }

  if (typeof emailBase64 != "string") {
    throw new Error("Email must be a string");
  }

  const email = decodeBase64(emailBase64);

  const user = (
    await User.findAll({
      where: {
        email: email,
      },
    })
  )[0];

  try {
    return hasPass ? user : user.toJSON();
  } catch (e) {
    return null;
  }
};
