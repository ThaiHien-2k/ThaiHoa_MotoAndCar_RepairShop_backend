const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  accounts_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String },
  customer_type: { type: String,  enum: ['0', '1','2','3','4','5','6','7','8'], default: '0' }, // 0: Customer,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);
