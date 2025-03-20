const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  accounts_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String },
  customer_type: { type: String, enum: ['cá nhân', 'doanh nghiệp'], default: 'cá nhân' },
  loyalty_points: { type: Number, default: 0 },
  referral_code: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);
