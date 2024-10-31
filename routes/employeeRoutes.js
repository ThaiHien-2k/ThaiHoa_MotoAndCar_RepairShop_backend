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

// Create a new employee (requires admin privilege)
router.post("/", authMiddleware("admin"), createEmployee);

// Get all employees (requires authentication)
router.get("/", authMiddleware, getAllEmployees);

// Get employee by ID (requires authentication)
router.get("/:id", authMiddleware, getEmployeeById);

// Update employee by ID (requires admin privilege)
router.put("/:id", authMiddleware("admin"), updateEmployee);

// Delete employee by ID (requires admin privilege)
router.delete("/:id", authMiddleware("admin"), deleteEmployee);

// Filter employees based on query parameters (requires authentication)
router.get("/filter", authMiddleware, filterEmployees);

module.exports = router;
