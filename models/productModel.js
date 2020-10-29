const mongoose = require('mongoose');

const { Schema } = mongoose;

const productModel = new Schema(
  {
    name: String,
    costPrice: Number,
    sellingPrice: Number,
    quantity: Number,
    warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model('Product', productModel);
