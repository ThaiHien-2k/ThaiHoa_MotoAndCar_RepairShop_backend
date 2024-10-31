const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
    createComment,
    deleteComment,
    getCommentsByProductId,
    filterComments,
} = require("../controllers/commentController");

const router = express.Router();

// Create a new comment (requires authentication)
router.post("/", authMiddleware, createComment);

// Delete a comment by ID (requires authentication)
router.delete("/:id", authMiddleware, deleteComment);

// Get comments by product ID (can be public or require auth depending on your app's needs)
router.get("/product/:productId", getCommentsByProductId);

// Filter comments (consider whether this requires authentication)
router.get("/filter", authMiddleware, filterComments);

module.exports = router;
