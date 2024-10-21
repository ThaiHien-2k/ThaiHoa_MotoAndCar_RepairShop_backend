const Comment = require("../models/commentModel");
const Product = require("../models/productModel");
const User = require("../models/accountModel");

exports.createComment = async (req, res) => {
    const { productId, text } = req.body;
    const userId = req.user._id; // Assuming user info is available in req.user

    try {
        const newComment = new Comment({
            productId,
            userId,
            text,
        });

        await newComment.save();
        res.status(201).json({
            message: "Comment created successfully",
            newComment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCommentsByProductId = async (req, res) => {
    const { productId } = req.params;

    try {
        const comments = await Comment.find({ productId }).populate(
            "userId",
            "name"
        );
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
