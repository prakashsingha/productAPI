/* eslint-disable no-unused-vars */

function warehouseController(Warehouse) {
  function searchWarehouse(req, res) {
    Warehouse.find((err, warehouses) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).json(warehouses);
    });
  }

  function addWarehouse(req, res) {
    const warehouse = new Warehouse(req.body);
    warehouse.save((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(201).json(warehouse);
    });
  }

  function deleteWarehouse(req, res) {
    req.warehouse.remove((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.sendStatus(204);
    });
  }

  function getBookMiddleware(req, res, next) {
    Warehouse.findById(req.params.id, (err, warehouse) => {
      if (err) {
        return res.status(500).send(err);
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
    getBookMiddleware
  };
}

module.exports = warehouseController;
