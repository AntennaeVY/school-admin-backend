const User = require("../../models/user.model");

module.exports.createUser = async (data) => {
  if (!data) {
    throw new Error("No data provided");
  }

  if (typeof data != "object") {
    throw new Error("Data must be an object");
  }

  return await User.create(data);
};
