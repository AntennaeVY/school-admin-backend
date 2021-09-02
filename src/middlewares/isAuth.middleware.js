const { response } = require("../utils/response");
const { verifyToken, decodeToken } = require("../utils/token");

module.exports.isAuth = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return response.badRequest(
      res,
      "No token provided in headers, please log in"
    );
  }

  verifyToken(token)
    .then(() => {
      req.user = decodeToken(token);
      next();
    })
    .catch((err) => {
      return response.unauthorized(
        res,
        "Token invalid or expired. Must be logged in"
      );
    });
};
