const { response } = require("../../utils/response");
const {
  updateOneById,
  updateOneByEmail,
} = require("../../services/users/update.service");

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

module.exports.updateOneByEmail = async (req, res) => {
  try {
    if (!req.body.email) {
      return response.badRequest(res, "Email must be provided");
    }

    const update = req.body;
    const { email } = req.body;

    if (req.user.email != email && !req.isAdmin) {
      return response.unauthorized(res, "Can't modify another user's info");
    }

    if (update.role && !req.isAdmin) {
      return response.unauthorized(res, "Can't change your role");
    }

    updateOneByEmail(email, update)
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
