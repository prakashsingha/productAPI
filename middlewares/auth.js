const jwt = require('jsonwebtoken');

const helper = require('../controllers/helper')();
const TokenBlackList = require('../models/tokenBlackListModel');

function auth() {
  async function isBlackListed(token) {
    const blackListed = await TokenBlackList.findOne({ token });
    return blackListed;
  }

  async function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
      return helper.sendError(res, 401, 'Not authorized');
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return helper.sendError(res, 401, 'Not authorized');
    }

    const blackListed = await isBlackListed(token);
    if (blackListed) {
      return helper.sendError(res, 401, 'Invalid token. Please login again');
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
