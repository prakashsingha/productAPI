const express = require('express');

const warehouseController = require('../controllers/warehouseController');
const auth = require('../middlewares/auth')();

function routes(Warehouse) {
  const warehouseRouter = express.Router();
  const controller = warehouseController(Warehouse);

  warehouseRouter.use('/warehouses/:id', [
    controller.getWarehouseMiddleware,
    auth.verifyToken
  ]);
  warehouseRouter
    .route('/warehouses/:id')
    .get((req, res) => res.json(req.warehouse))
    .delete(controller.deleteWarehouse);

  warehouseRouter.use('/warehouses', auth.verifyToken);
  warehouseRouter
    .route('/warehouses')
    .get(controller.searchWarehouse)
    .post(controller.addWarehouse);

  return warehouseRouter;
}

module.exports = routes;
