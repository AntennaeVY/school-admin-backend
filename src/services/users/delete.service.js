const User = require("../../models/user.model");

module.exports.deleteOneById = async (id) => {
  if (!id) {
    throw new Error("Id must be provided");
  }

  return await User.findByIdAndDelete(id);
};
