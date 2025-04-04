// models/accountModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  privilege: { type: String, enum: ['0', '1','2'], default: '1' }, // 0: Admin, 1: User
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  last_login: { type: Date },
  role_description: { type: String },
  avatar: { type: String},
  is_active: { type: Boolean, default: true }
});


module.exports = mongoose.model('Account', accountSchema);
