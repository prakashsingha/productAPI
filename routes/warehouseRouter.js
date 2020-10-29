const express = require('express');

const warehouseController = require('../controllers/warehouseController');

function routes(Warehouse) {
  const warehouseRouter = express.Router();
  const controller = warehouseController(Warehouse);

  warehouseRouter.use('/warehouses/:id', controller.getWarehouseMiddleware);

  warehouseRouter
    .route('/warehouses/:id')
    .get((req, res) => res.json(req.warehouse))
    .delete(controller.deleteWarehouse);

  warehouseRouter
    .route('/warehouses')
    .get(controller.searchWarehouse)
    .post(controller.addWarehouse);

  return warehouseRouter;
}

module.exports = routes;
