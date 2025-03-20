const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactPerson: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  productsSupplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  tax_id: { type: String, required: true },
  contract_details: {
    sign_date: { type: Date, required: true },
    expiry_date: { type: Date, required: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Supplier', supplierSchema);