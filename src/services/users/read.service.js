const User = require("../../models/user.model");

module.exports.getAllUsers = async () => {
  return await User.find({});
};

module.exports.getOneById = async (id) => {
  if (!id) {
    throw new Error("Id must be provided");
  }

  return await User.findById(id);
};

module.exports.getOneByEmail = async (email) => {
  if (!email) {
    throw new Error("Email must be provided");
  }

  if (typeof email != "string") {
    throw new Error("Email must be a string");
  }

  return await User.findOne({ email });
};
