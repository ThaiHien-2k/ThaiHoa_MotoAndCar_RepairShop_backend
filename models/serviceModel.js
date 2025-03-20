const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  required_parts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  employee_specialization: [{ type: String }]
});

module.exports = mongoose.model('Service', serviceSchema);
