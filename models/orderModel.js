const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['processing', 'completed', 'cancelled'], default: 'processing' },
  totalAmount: { type: Number, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  services: [
    {
      serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
      price: { type: Number, required: true },
    },
  ],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  shippingFee: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cash', 'credit_card'], required: true },
  paymentStatus: { type: String, enum: ['paid', 'unpaid', 'pending'], required: true },
  tracking_number: { type: String },
  order_notes: { type: String },
  shipment_status: { type: String, enum: ['Đang vận chuyển', 'Đã giao', 'Chờ xử lý'], default: 'Chờ xử lý' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);