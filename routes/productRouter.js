const express = require('express');

const productController = require('../controllers/productController');
const auth = require('../middlewares/auth')();

function routes(Product) {
  const productRouter = express.Router();
  const controller = productController(Product);

  productRouter.use('/products/:id', [
    controller.getProductMiddleware,
    auth.verifyToken
  ]);
  productRouter
    .route('/products/:id')
    .get((req, res) => res.json(req.product))
    .patch(controller.updateProduct)
    .delete(controller.deleteProduct);

  productRouter.use('/products', auth.verifyToken);
  productRouter
    .route('/products')
    .get(controller.searchProduct)
    .post(controller.addProduct);

  return productRouter;
}

module.exports = routes;
