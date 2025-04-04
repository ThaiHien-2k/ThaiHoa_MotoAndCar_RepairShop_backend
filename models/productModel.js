const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Đúng kiểu ObjectId
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  stock_quantity: { type: Number, required: true },
  description: { type: String },
  images: { type: [String], default: [] },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  average_rating: { type: Number, default: 0 },
  ratings_count: { type: Number, default: 0 },
  // supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true }, // Sửa đúng tên và kiểu
  createdAt: { type: Date, default: Date.now },
  specifications: {
    size: { type: String },
    material: { type: String },
    weight: { type: String },
    color: { type: String },
    compatibility: { type: [String] },
    tread_pattern: { type: String },
    temperature_resistance: { type: String }
  },
  warranty: {
    period: { type: String },
    details: { type: String },
    terms: { type: String }
  },
  origin: { type: String },
  warranty_center: { type: String },
  discount: { type: String },
  related_products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Đảm bảo đúng kiểu và ref
  tags: { type: [String], default: [] }
});

module.exports = mongoose.model('Product', productSchema);
