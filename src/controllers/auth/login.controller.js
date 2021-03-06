const { response } = require("../../utils/response");
const { login } = require("../../services/auth/login.service");

module.exports.login = (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return response.badRequest(res, "No email/password provided");
    }

    const { email, password } = req.body;

    login(email, password)
      .then((token) => {
        return response.success(res, token);
      })
      .catch((err) => {
        return response.forbidden(res, err.message);
      });
  } catch (err) {
    return response.internalError(res, "Internal Server Error");
  }
};
