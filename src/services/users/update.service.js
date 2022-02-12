const ObjectId = require("mongoose").Types.ObjectId;

const User = require("../../models/user.model");

module.exports.updateOneById = async (id, update) => {
  if (!id) {
    throw new Error("Id must be provided");
  }

  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid id");
  } else if (ObjectId(id) != id) {
    throw new Error("Invalid id");
  }

  if (!update) {
    throw new Error("Update must be provided");
  }

  if (typeof update != "object") {
    throw new Error("Update must be an object");
  }
  return await User.findByIdAndUpdate(id, update, { new: true });
};
