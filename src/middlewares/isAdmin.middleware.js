module.exports.isAdmin = (req, res, next) => {
  if (req.user.role != "ADMIN_ROLE") {
    req.isAdmin = false;
  } else {
    req.isAdmin = true;
  }

  next();
};
