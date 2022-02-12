module.exports.response = {
  success: (res, response) => {
    return res.status(200).json({ success: true, response });
  },

  badRequest: (res, response) => {
    return res.status(400).json({ success: false, response });
  },

  unauthorized: (res, response) => {
    return res.status(401).json({ success: false, response });
  },

  forbidden: (res, response) => {
    return res.status(403).json({ success: false, response });
  },

  notFound: (res, response) => {
    return res.status(404).json({ success: false, response });
  },

  internalError: (res, response) => {
    return res.status(500).json({ success: false, response });
  },
};
