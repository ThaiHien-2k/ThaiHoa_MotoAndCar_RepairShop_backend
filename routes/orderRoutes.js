const express = require("express");
const {
    createOrder,
    deleteOrder,
    getOrdersByUserId,
} = require("../controllers/orderController");

const router = express.Router();

// Create a new order
router.post("/", createOrder);

// Delete an order by ID
router.delete("/:id", deleteOrder);

// Get all orders for a specific user by user ID
router.get("/user/:userId", getOrdersByUserId);

module.exports = router;
