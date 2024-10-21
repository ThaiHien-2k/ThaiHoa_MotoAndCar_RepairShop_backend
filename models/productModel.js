const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: Number,
        enum: [0, 1, 2], // 0: motorbike, 1: car, 2: another
        required: true,
    },
    subcategory: {
        type: String,
        required: true,
    },
    rate: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        default: "0",
    },
    purchases: {
        type: String,
        default: "0",
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    specifications: {
        size: {
            type: String,
            required: true,
        },
        material: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
    },
    warranty: {
        period: {
            type: String,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },
    },
    tags: {
        type: [String],
        default: [],
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    relatedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
