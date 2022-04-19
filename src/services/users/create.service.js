const User = require("../../models/user.model");

module.exports.createUser = async (data) => {
  if (!data) {
    throw new Error("No data provided");
  }

  if (typeof data != "object") {
    throw new Error("Data must be an object");
  }

  delete data.role;

  const user = await User.create(data);

  try {
    return user.toJSON();
  } catch (e) {
    return null;
  }
};
