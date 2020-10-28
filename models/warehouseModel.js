const mongoose = require('mongoose');

const { Schema } = mongoose;

const warehouseModel = new Schema(
  {
    name: String,
    location: String
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model('Warehouse', warehouseModel);
