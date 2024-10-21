const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
    createComment,
    deleteComment,
    getCommentsByProductId,
    filterComments,
} = require("../controllers/commentController");

const router = express.Router();

router.post("/", authMiddleware, createComment);
router.delete("/:id", authMiddleware, deleteComment);
router.get("/product/:productId", getCommentsByProductId);
router.get("/filter", filterComments);

module.exports = router;
