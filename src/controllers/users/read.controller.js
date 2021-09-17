const { response } = require("../../utils/response");
const {
  getAllUsers,
  getOneById,
  getOneByEmail,
} = require("../../services/users/read.service.js");

module.exports.getAllUsers = (req, res) => {
  try {
    getAllUsers().then((allUsers) => {
      return response.success(res, allUsers);
    });
  } catch (err) {
    return response.internalError(res, "Internal Server Error");
  }
};

module.exports.getOneById = (req, res) => {
  try {
    const { id } = req.params;

    getOneById(id)
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

module.exports.getOneByEmail = (req, res) => {
  try {
    getOneByEmail(req.body.email)
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
