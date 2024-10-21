const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    filterEmployees,
} = require("../controllers/employeeController");

// Create a new employee
router.post("/", authMiddleware, createEmployee);

// Get all employees
router.get("/", authMiddleware, getAllEmployees);

// Get employee by ID
router.get("/:id", authMiddleware, getEmployeeById);

// Update employee by ID
router.put("/:id", authMiddleware, updateEmployee);

// Delete employee by ID
router.delete("/:id", authMiddleware, deleteEmployee);

// Filter employees based on query parameters
router.get("/filter", authMiddleware, filterEmployees);

module.exports = router;
