const req = require("express/lib/request");
const User = require("../../models/user.model");

module.exports.createUser = async (data) => {
  if (!data) {
    throw new Error("No data provided");
  }

  if (typeof data != "object") {
    throw new Error("Data must be an object");
  }

  delete data.role;
  return await User.create(data);
};
