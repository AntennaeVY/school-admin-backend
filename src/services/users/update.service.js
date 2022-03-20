const { user } = require("pg/lib/defaults");
const User = require("../../models/user.model");

module.exports.updateOneById = async (id, update) => {
  if (!id) {
    throw new Error("Id must be provided");
  }

  if (!update) {
    throw new Error("Update must be provided");
  }

  if (typeof update != "object") {
    throw new Error("Update must be an object");
  }
  const result = await User.update(update, {
    where: {
      _id: id,
    },
  });

  return result[0] ? "Updated successfuly" : null;
};

module.exports.updateOneByEmail = async (email, update) => {
  if (!email) {
    throw new Error("Email must be provided");
  }

  if (!update) {
    throw new Error("Update must be provided");
  }

  if (typeof update != "object") {
    throw new Error("Update must be an object");
  }

  const result = await User.update(update, {
    where: {
      email: email,
    },
  });

  return result[0] ? "Updated successfuly" : null;
};
