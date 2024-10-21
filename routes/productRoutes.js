const express = require("express");
const {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getProductById,
} = require("../controllers/productController");

const router = express.Router();

// Create a new product
router.post("/", createProduct);

// Delete a product by ID
router.delete("/:id", deleteProduct);

// Update a product by ID
router.put("/:id", updateProduct);

// Get all products
router.get("/", getAllProducts);

// Get a product by ID
router.get("/:id", getProductById);

module.exports = router;
