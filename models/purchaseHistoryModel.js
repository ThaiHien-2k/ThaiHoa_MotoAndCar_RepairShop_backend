const mongoose = require('mongoose');

const purchaseItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const purchaseHistorySchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  date: { type: Date, required: true },
  items: { type: [purchaseItemSchema], required: true },
  totalAmount: { type: Number, required: true },
  payment_method: { type: String, enum: ['cash', 'credit_card', 'bank_transfer'], required: true },
  invoice_number: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PurchaseHistory', purchaseHistorySchema);
