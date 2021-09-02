const User = require("../../models/user.model");

module.exports.deleteOneById = async (id) => {
  if (!id) {
    throw new Error("Id must be provided");
  }

  if (Number(id) == NaN) {
    throw new Error("Id must be a number");
  }

  return await User.findByIdAndDelete(id);
};
