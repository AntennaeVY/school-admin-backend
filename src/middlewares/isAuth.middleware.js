const { response } = require("../utils/response");
const { verifyToken, decodeToken } = require("../utils/token");

module.exports.isAuth = (req, res, next) => {
  let header = req.headers["authorization"];

  if (!header) {
    return response.badRequest(
      res,
      "No token provided in headers, please log in"
    );
  }

  const token = header.split(" ")[1];

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
