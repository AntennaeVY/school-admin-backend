module.exports.isAdmin = (req, res, next) => {
  req.isAdmin = req.user.role != "ADMIN_ROLE";

  next();
};
