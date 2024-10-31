const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
    createOrder,
    deleteOrder,
    getOrdersByUserId,
    filterOrders,
} = require("../controllers/orderController");

const router = express.Router();

// Create a new order (requires authentication)
router.post("/", authMiddleware, createOrder);

// Delete an order by ID (requires authentication)
router.delete("/:id", authMiddleware, deleteOrder);

// Get all orders for a specific user by user ID (requires authentication)
router.get("/user/:userId", authMiddleware, getOrdersByUserId);

// Filter orders (requires authentication)
router.get("/filter", authMiddleware, filterOrders);

module.exports = router;
