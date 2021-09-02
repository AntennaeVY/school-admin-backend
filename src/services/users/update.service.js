const User = require("../../models/user.model");

module.exports.updateOneById = async (id, update) => {
  if (!id) {
    throw new Error("Id must be provided");
  }

  if (!update) {
    throw new Error("Update must be provided");
  }

  if (Number(id) == NaN) {
    throw new Error("Id must be a number");
  }

  if (typeof update != "object") {
    throw new Error("Update must be an object");
  }
  return await User.findByIdAndUpdate(id, update, { new: true });
};
