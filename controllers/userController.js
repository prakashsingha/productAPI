/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');

const helper = require('./helper')();

function userController(User, TokenBlackList) {
  async function getUserByUsername(username) {
    const user = await User.findOne({ username });
    return user;
  }

  function getUsernameFromToken(token) {
    return jwt.decode(token).sub;
  }

  function searchUser(req, res) {
    User.find((err, users) => {
      if (err) {
        return helper.sendError(res, 500, err);
      }
      return res.status(200).json(users);
    });
  }

  async function addUser(req, res) {
    const user = new User(req.body);
    const existingUser = await getUserByUsername(user.username);

    if (existingUser) {
      return helper.sendError(res, 409, 'username already exists');
    }
    user.password = await helper.hashPassword(user.password);
    user.save((err) => {
      if (err) {
        return helper.sendError(res, 500, err);
      }
      return res.status(201).json(user);
    });
  }

  function deleteUser(req, res) {
    req.user.remove((err) => {
      if (err) {
        return helper.sendError(res, 500, err);
      }
      return res.sendStatus(204);
    });
  }

  async function generateToken(prevToken, username) {
    const name = username || helper.getUsernameFromToken(prevToken);
    const user = await User.findOne({ username: name });
    const options = {
      algorithm: process.env.ALGORITHM,
      expiresIn: process.env.EXPIRY,
      issuer: process.env.ISSUER,
      subject: username || user.username,
      audience: []
    };
    return jwt.sign({}, process.env.SECRET, options);
  }

  async function login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return helper.sendError(res, 404, 'user not found');
    }
    const isAuthenticated = await helper.comparePassword(
      password,
      user.password
    );

    if (!isAuthenticated) {
      return helper.sendError(res, 401, 'username or password is not correct');
    }

    const token = await generateToken(null, user.username);
    return res.status(200).json({ username, token });
  }

  async function logout(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const username = getUsernameFromToken(token);

    const blackListedToken = new TokenBlackList({ username, token });
    blackListedToken.save((err) => {
      if (err) {
        return helper.sendError(res, 500, err);
      }
      return res.status(200).json({ message: 'Successfully logged out.' });
    });
  }

  function getUserMiddleware(req, res, next) {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        return helper.sendError(res, 500, err);
      }
      if (user) {
        req.user = user;
        return next();
      }
      return res.sendStatus(404);
    });
  }

  return {
    searchUser,
    addUser,
    deleteUser,
    login,
    logout,
    getUserMiddleware
  };
}

module.exports = userController;
