const mongoose = require('mongoose');

const repairHistorySchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  date: { type: Date, required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  price: { type: Number, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  technician_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  parts_used: [{
    partId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  total_cost: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  warranty_info: {
    warranty_period: { type: String },
    expiration_date: { type: Date }
  },
  repair_details: [{
    task: { type: String, required: true },
    status: { type: String, enum: ['pending', 'done'], required: true }
  }],
  payment_method: { type: String, required: true },
  invoice_number: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('RepairHistory', repairHistorySchema);
