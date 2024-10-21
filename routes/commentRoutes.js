const express = require("express");
const {
    createComment,
    deleteComment,
    getCommentsByProductId,
} = require("../controllers/commentController");

const router = express.Router();

// Create a new comment
router.post("/", createComment);

// Delete a comment by ID
router.delete("/:id", deleteComment);

// Get comments for a specific product by product ID
router.get("/product/:productId", getCommentsByProductId);

module.exports = router;
