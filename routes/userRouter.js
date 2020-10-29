const express = require('express');

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

function routes(User, TokenBlackList) {
  const userRouter = express.Router();
  const controller = userController(User, TokenBlackList);
  const auth = authMiddleware();

  userRouter.route('/users/login').post(controller.login);
  userRouter.route('/users/register').post(controller.addUser);

  userRouter.route('/users/logout').post(controller.logout);

  userRouter.use('/users/:id', [
    controller.getUserMiddleware,
    auth.verifyToken
  ]);
  userRouter
    .route('/users/:id')
    .get((req, res) => res.json(req.user))
    .delete(controller.deleteUser);

  userRouter.use('/users', auth.verifyToken);
  userRouter.route('/users').get(controller.searchUser);

  return userRouter;
}

module.exports = routes;
