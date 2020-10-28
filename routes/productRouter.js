const express = require('express');

const productController = require('../controllers/productController');

function routes(Product) {
  const productRouter = express.Router();
  const controller = productController(Product);

  productRouter.use('/products/:id', controller.getBookMiddleware);

  productRouter
    .route('/products/:id')
    .get((req, res) => res.json(req.product))
    .patch(controller.updateProduct)
    .delete(controller.deleteProduct);

  productRouter
    .route('/products')
    .get(controller.searchProduct)
    .post(controller.addProduct);

  return productRouter;
}

module.exports = routes;
