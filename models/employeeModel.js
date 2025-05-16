const mongoose = require('mongoose');

const AllowanceSchema = new mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: String, required: true }
});

const DeductionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true }
});

const BonusSchema = new mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  reason: { type: String }
});

const PaymentHistorySchema = new mongoose.Schema({
  month: { type: String, required: true },
  payment_date: { type: Date, required: true },
  paid_amount: { type: Number, required: true },
  status: { type: String, enum: ['paid', 'pending'], default: 'pending' }
});

const SalarySchema = new mongoose.Schema({
  base_salary: { type: Number, required: true },
  allowances: [AllowanceSchema],
  deductions: [DeductionSchema],
  bonuses: [BonusSchema],
  net_salary: { type: Number, required: true },
  payment_history: [PaymentHistorySchema]
});

const PerformanceReviewSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  score: { type: Number, required: true },
  comments: { type: String }
});

const LeaveRecordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  reason: { type: String, required: true }
});

// NEW: Bank Account Schema
const BankAccountSchema = new mongoose.Schema({
  account_name: { type: String, required: true },
  account_number: { type: String, required: true },
  bank_name: { type: String, required: true },
  expiry_date: { type: String, required: true }
});

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  employment_type: { type: String, enum: ['full_time', 'part_time', 'contract'], required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  hiredDate: { type: Date, required: true },
  specializations: [{ type: String }],
  salary: SalarySchema,
  performance_reviews: [PerformanceReviewSchema],
  bank_account: BankAccountSchema,
  leave_records: [LeaveRecordSchema],
  certifications: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
