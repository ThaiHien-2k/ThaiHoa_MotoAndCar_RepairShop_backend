const mongoose = require('mongoose');

const productCommentSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['approved', 'pending', 'rejected'],
    default: 'approved'
  },
  likes: {
    type: Number,
    default: 0
  },
  replies: [
    {
      accounts_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
      },
      author: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  isVerifiedPurchase: {
    type: Boolean,
    default: false
  },
  imageUploads: [
    {
      type: String
    }
  ],
  editedAt: {
    type: Date
  }
});

const ProductComment = mongoose.model('ProductComment', productCommentSchema);

module.exports = ProductComment;
