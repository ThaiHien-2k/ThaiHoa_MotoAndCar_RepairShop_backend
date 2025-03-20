const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  accounts_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  content: { type: String, required: true },
  images: [{ type: String }],
  tags: [{ type: String }],
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  status: { type: String, enum: ['published', 'draft'], default: 'draft' },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  related_blogs: [{
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
    title: { type: String },
    slug: { type: String }
  }],
  seo_keywords: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);
