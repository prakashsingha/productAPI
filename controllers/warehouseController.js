/* eslint-disable no-unused-vars */
const helper = require('./helper')();

function warehouseController(Warehouse) {
  function searchWarehouse(req, res) {
    Warehouse.find((err, warehouses) => {
      if (err) {
        return helper.sendError(res, 500, err);
      }
      return res.status(200).json(warehouses);
    });
  }

  function addWarehouse(req, res) {
    const warehouse = new Warehouse(req.body);
    warehouse.save((err) => {
      if (err) {
        return helper.sendError(res, 500, err);
      }
      return res.status(201).json(warehouse);
    });
  }

  function deleteWarehouse(req, res) {
    req.warehouse.remove((err) => {
      if (err) {
        return helper.sendError(res, 500, err);
      }
      return res.sendStatus(204);
    });
  }

  function getWarehouseMiddleware(req, res, next) {
    Warehouse.findById(req.params.id, (err, warehouse) => {
      if (err) {
        return helper.sendError(res, 500, err);
      }
      if (warehouse) {
        req.warehouse = warehouse;
        return next();
      }
      return res.sendStatus(404);
    });
  }

  return {
    searchWarehouse,
    addWarehouse,
    deleteWarehouse,
    getWarehouseMiddleware
  };
}

module.exports = warehouseController;
