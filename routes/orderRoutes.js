const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
    createOrder,
    deleteOrder,
    getOrdersByUserId,
    filterOrders,
} = require("../controllers/orderController");

const router = express.Router();

// Create a new order
router.post("/", authMiddleware, createOrder);

// Delete an order by ID
router.delete("/:id", authMiddleware, deleteOrder);

// Get all orders for a specific user by user ID
router.get("/user/:userId", authMiddleware, getOrdersByUserId);

// Filter orders
router.get("/filter", authMiddleware, filterOrders);

module.exports = router;
