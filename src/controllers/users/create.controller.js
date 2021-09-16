const { response } = require("../../utils/response");
const { createUser } = require("../../services/users/create.service");

module.exports.createUser = (req, res) => {
  try {
    createUser(req.body)
      .then((usr) => {
        return response.success(res, usr);
      })
      .catch((err) => {
        return response.badRequest(res, err.message);
      });
  } catch (err) {
    return response.internalError(res, "Internal Server Error");
  }
};
