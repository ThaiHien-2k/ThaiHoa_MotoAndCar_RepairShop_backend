const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['percentage_discount', 'fixed_discount'], required: true },
  promotionCode: { type: String, required: true, unique: true },
  value: { type: Number, required: true },
  unit: { type: String, enum: ['percent', 'currency'], required: true },
  maxDiscount: { type: Number },
  applicableProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  applicableServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  usage_limit: { type: Number },
  customer_eligibility: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Promotion', promotionSchema);