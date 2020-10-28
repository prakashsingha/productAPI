function helper() {
  function sendError(res, code, message) {
    const msg = { code, message };
    res.status(code).json(msg);
  }

  return {
    sendError
  };
}

module.exports = helper;
