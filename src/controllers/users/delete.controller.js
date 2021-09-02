const { response } = require("../../utils/response");
const { deleteOneById } = require("../../services/users/delete.service");

module.exports.deleteOneById = (req, res) => {
  try {
    const { id } = req.params;

    if (!req.isAdmin && req.user._id != id) {
      return response.unauthorized(res, "Can't delete another user");
    }

    deleteOneById(id)
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
