const express = require('express');

function routes(Warehouse) {
  const warehouseRouter = express.Router();

  warehouseRouter.use('/warehouses/:id', (req, res, next) => {
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
  });

  warehouseRouter
    .route('/warehouses/:id')
    .get((req, res) => res.json(req.warehouse))
    .delete((req, res) => {
      req.warehouse.remove((err) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.sendStatus(204);
      });
    });

  warehouseRouter
    .route('/warehouses')
    .get((req, res) => {
      Warehouse.find((err, warehouses) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).json(warehouses);
      });
    })
    .post((req, res) => {
      const warehouse = new Warehouse(req.body);
      warehouse.save((err) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(201).json(warehouse);
      });
    });

  return warehouseRouter;
}

module.exports = routes;
