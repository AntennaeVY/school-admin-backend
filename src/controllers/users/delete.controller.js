const { response } = require("../../utils/response");
const { decodeBase64 } = require("../../utils/encrypt");
const {
  deleteOneById,
  deleteOneByEmail,
} = require("../../services/users/delete.service");

module.exports.deleteOneById = (req, res) => {
  try {
    const { id } = req.params;

    if (!req.isAdmin && req.user._id != id) {
      return response.unauthorized(res, "Can't delete another user");
    }

    deleteOneById(id)
      .then((usr) => {
        if (!usr) return response.notFound(res, "User doesn't exist");
        return response.success(res, usr);
      })
      .catch((err) => {
        return response.badRequest(res, err.message);
      });
  } catch (err) {
    return response.internalError(res, "Internal Server Error");
  }
};

module.exports.deleteOneByEmail = (req, res) => {
  try {
    const email = decodeBase64(req.params.emailBase64);

    if (!req.isAdmin && req.user.email != email) {
      return response.unauthorized(res, "Can't delete another user");
    }

    deleteOneByEmail(req.params.emailBase64)
      .then((usr) => {
        if (!usr) return response.notFound(res, "User doesn't exist");
        return response.success(res, usr);
      })
      .catch((err) => {
        return response.badRequest(res, err.message);
      });
  } catch (err) {
    console.log(err.message);
    return response.internalError(res, "Internal Server Error");
  }
};
