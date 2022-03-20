const User = require("../../models/user.model");
const { decodeBase64 } = require("../../utils/encrypt");

module.exports.deleteOneById = async (id) => {
  if (!id) {
    throw new Error("Id must be provided");
  }

  const user = await User.destroy({
    where: {
      _id: id,
    },
  });

  try {
    return user.toJSON();
  } catch (e) {
    return null;
  }
};

module.exports.deleteOneByEmail = async (emailBase64) => {
  if (!emailBase64) {
    throw new Error("Email must be provided");
  }

  const email = decodeBase64(emailBase64);

  const user = await User.destroy({
    where: {
      email: email,
    },
  });

  try {
    return user.toJSON();
  } catch (e) {
    return null;
  }
};
