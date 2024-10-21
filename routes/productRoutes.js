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

// Create a new product
router.post("/", authMiddleware, createProduct);

// Delete a product by ID
router.delete("/:id", authMiddleware, deleteProduct);

// Update a product by ID
router.put("/:id", authMiddleware, updateProduct);

// Get all products
router.get("/", getAllProducts);

// Get a product by ID
router.get("/:id", getProductById);

// Filter products
router.get("/filter", filterProducts);

module.exports = router;
