const mongoose = require('mongoose');

const blogCommentSchema = new mongoose.Schema({
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
  accounts_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BlogComment', blogCommentSchema);
