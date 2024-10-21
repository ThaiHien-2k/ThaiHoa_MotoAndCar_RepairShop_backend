const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: Number,
        required: true,
        enum: [0, 1, 2], // 0: motorbike, 1: car, 2: another
    },
    price: {
        type: Number,
        required: true,
    },
    estimatedTime: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
