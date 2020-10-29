/* eslint-disable no-unused-vars */
const helper = require('./helper')();

function productController(Product) {
  function searchProduct(req, res) {
    Product.find((err, products) => {
      if (err) {
        return helper.sendError(res, 500, err);
      }
      return res.status(200).json(products);
    });
  }

  function addProduct(req, res) {
    const product = new Product(req.body);
    product.save((err) => {
      if (err) {
        return helper.sendError(res, 500, err);
      }
      return res.status(201).json(product);
    });
  }

  function deleteProduct(req, res) {
    req.product.remove((err) => {
      if (err) {
        return helper.sendError(res, 500, err);
      }
      return res.sendStatus(204);
    });
  }

  function updateProduct(req, res) {
    const { product } = req;

    if (req.body.id) {
      delete req.body.id;
    }

    Object.entries(req.body).forEach((field) => {
      const [key, val] = field;
      product[key] = val;

      product.save((err) => {
        if (err) {
          return helper.sendError(res, 500, err);
        }
        return res.status(200).json(product);
      });
    });
  }

  function getProductMiddleware(req, res, next) {
    Product.findById(req.params.id, (err, product) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (product) {
        req.product = product;
        return next();
      }
      return res.sendStatus(404);
    });
  }

  return {
    searchProduct,
    addProduct,
    deleteProduct,
    updateProduct,
    getProductMiddleware
  };
}

module.exports = productController;
