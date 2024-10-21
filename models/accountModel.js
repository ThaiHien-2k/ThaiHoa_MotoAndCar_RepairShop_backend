const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        privilege: {
            type: String,
            required: true,
            default: "1", // 1: User, 0: Admin
        },
        password: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false }
);

module.exports = mongoose.model("Account", accountSchema);
