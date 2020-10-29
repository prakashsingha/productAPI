const bcrypt = require('bcrypt');

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

  return {
    sendError,
    hashPassword,
    comparePassword
  };
}

module.exports = helper;
