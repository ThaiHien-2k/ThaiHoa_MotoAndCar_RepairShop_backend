const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    hiredDate: {
        type: Date,
        default: Date.now,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive", "on_leave"],
        default: "active",
    },
    privilege: {
        type: String,
        enum: ["admin", "staff"],
        default: "staff",
    },
    skills: [
        {
            type: String,
        },
    ],
    profilePicture: {
        type: String,
    },
    department: {
        type: String,
    },
    workingHours: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // Reference to the Account model
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true, // Ensure that an account is always associated
    },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
