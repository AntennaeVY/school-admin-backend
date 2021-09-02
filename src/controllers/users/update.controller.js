const { response } = require("../../utils/response");
const { updateOneById } = require("../../services/users/update.service");

module.exports.updateOneById = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    if (req.user._id != id && !req.isAdmin) {
      return response.unauthorized(res, "Can't modify another user's info");
    }

    if (update.role && !req.isAdmin) {
      return response.unauthorized(res, "Can't change your role");
    }

    updateOneById(id, update)
      .then((usr) => {
        return response.success(res, usr);
      })
      .catch((err) => {
        return response.badRequest(res, err);
      });
  } catch (err) {
    return response.internalError(res, "Internal Server Error");
  }
};
