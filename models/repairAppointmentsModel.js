const mongoose = require('mongoose');

const appointmentStatusHistorySchema = new mongoose.Schema({
  status: { type: String, required: true },
  date: { type: Date, required: true }
});

const locationSchema = new mongoose.Schema({
  address: { type: String, required: true }
});

const repairAppointmentSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  locationType: { type: String, enum: ['store', 'home'], required: true },
  location: { type: locationSchema, required: true },
  appointmentTime: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  appointment_status_history: [appointmentStatusHistorySchema],
  customer_feedback: { type: String },
  cancellation_reason: { type: String }
});

module.exports = mongoose.model('RepairAppointment', repairAppointmentSchema);