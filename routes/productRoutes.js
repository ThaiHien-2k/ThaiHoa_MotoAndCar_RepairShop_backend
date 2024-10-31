const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getProductById,
    filterProducts,
} = require("../controllers/productController");

const router = express.Router();

// Create a new product (requires authentication)
router.post("/", authMiddleware, createProduct);

// Delete a product by ID (requires authentication)
router.delete("/:id", authMiddleware, deleteProduct);

// Update a product by ID (requires authentication)
router.put("/:id", authMiddleware, updateProduct);

// Get all products (public or requires authentication, adjust as needed)
router.get("/", getAllProducts);

// Get a product by ID (public or requires authentication, adjust as needed)
router.get("/:id", getProductById);

// Filter products (public or requires authentication, adjust as needed)
router.get("/filter", filterProducts);

module.exports = router;
