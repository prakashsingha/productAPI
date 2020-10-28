const express = require('express');

function routes(Warehouse) {
  const warehouseRouter = express.Router();

  warehouseRouter.route('/warehouses/:id').get((req, res) => {
    Warehouse.findById(req.params.id, (err, warehouse) => {
      if (err) {
        return res.send(err);
      }
      return res.json(warehouse);
    });
  });

  warehouseRouter
    .route('/warehouses')
    .get((req, res) => {
      Warehouse.find((err, warehouses) => {
        if (err) {
          return res.send(err);
        }
        return res.json(warehouses);
      });
    })
    .post((req, res) => {
      const wh = new Warehouse(req.body);
      wh.save();
      res.status(201).json(wh);
    });

  return warehouseRouter;
}

module.exports = routes;
