const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

function helper() {
  function sendError(res, code, message) {
    const msg = { code, message };
    res.status(code).json(msg);
  }

  function hashPassword(password) {
    return bcrypt
      .hash(password, saltRounds)
      .then((hash) => hash)
      .catch((err) => console.error(err.message));
  }

  function comparePassword(password, hash) {
    return bcrypt
      .compare(password, hash)
      .then((res) => res)
      .catch((err) => console.error(err.message));
  }

  function getUsernameFromToken(token) {
    return jwt.decode(token).sub;
  }

  function getAudienceFromToken(token) {
    return jwt.decode(token).aud;
  }

  return {
    sendError,
    hashPassword,
    comparePassword,
    getUsernameFromToken,
    getAudienceFromToken
  };
}

module.exports = helper;
