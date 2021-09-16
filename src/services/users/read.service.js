const ObjectId = require("mongoose").Types.ObjectId;

const User = require("../../models/user.model");

module.exports.getAllUsers = async () => {
  return await User.find({});
};

module.exports.getOneById = async (id) => {
  if (!id) {
    throw new Error("Id must be provided");
  }

  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid id");
  } else if (ObjectID(id) != id) {
    throw new Error("Invalid id");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new Error("User doesn't exist");
  }

  return user;
};

module.exports.getOneByEmail = async (email) => {
  if (!email) {
    throw new Error("Email must be provided");
  }

  if (typeof email != "string") {
    throw new Error("Email must be a string");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User doesn't exist");
  }

  return user;
};
