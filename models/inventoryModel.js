const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['in_stock', 'out_of_stock', 'pending'], default: 'in_stock' },
  lastUpdated: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  reorder_threshold: { type: Number, default: 0 },
  incoming_stock: { type: Number, default: 0 },
  expiration_date: { type: Date },
  updateHistory: [{
    quantityChange: { type: Number, required: true },
    updatedBy: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Inventory', inventorySchema);