const jwt = require('jsonwebtoken');

const helper = require('../controllers/helper')();

function auth() {
  function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
      return helper.sendError(res, 401, 'Not authorized');
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return helper.sendError(res, 401, 'Not authorized');
    }

    jwt.verify(token, process.env.SECRET, (err) => {
      if (err) {
        return helper.sendError(res, 401, 'Please login again');
      }
    });
    return next();
  }

  return {
    verifyToken
  };
}

module.exports = auth;
