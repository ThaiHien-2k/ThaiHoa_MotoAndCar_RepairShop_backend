const BlogComment = require('../models/blogCommentsModel');

exports.createComment = async (req, res) => {
  try {
    const newComment = new BlogComment(req.body);
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCommentsByBlogId = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { status = 'approved', page = 1, limit = 10 } = req.query;

    const comments = await BlogComment.find({ blogId, status })
      .populate('accounts_id', 'username email')
      .limit(parseInt(limit))
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await BlogComment.countDocuments({ blogId, status });
    res.status(200).json({ total, comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const comment = await BlogComment.findById(req.params.commentId)
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const updatedComment = await BlogComment.findByIdAndUpdate(
      req.params.commentId,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await BlogComment.findByIdAndDelete(req.params.commentId);
    if (!deletedComment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.toggleCommentStatus = async (req, res) => {
  try {
    const comment = await BlogComment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    comment.status = comment.status === 'approved' ? 'rejected' : 'approved';
    comment.updatedAt = Date.now();
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like a blog comment
exports.likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const updatedComment = await BlogComment.findByIdAndUpdate(
      commentId,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reply to a blog comment
exports.replyToComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { accounts_id, author, content } = req.body;
    const updatedComment = await BlogComment.findByIdAndUpdate(
      commentId,
      { $push: { replies: { accounts_id, author, content } } },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get replies by comment ID
exports.getRepliesByCommentId = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await BlogComment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment.replies || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Change blog comment status
exports.changeCommentStatus = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { status } = req.body;
    if (!['approved', 'pending', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    const updatedComment = await BlogComment.findByIdAndUpdate(
      commentId,
      { status },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all blog comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await BlogComment.find().sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add reply to a blog comment (alternative)
exports.addReply = async (req, res) => {
  try {
    const { comment_id, accounts_id, author, content } = req.body;
    if (!comment_id || !accounts_id || !author || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const updatedComment = await BlogComment.findByIdAndUpdate(
      comment_id,
      { $push: { replies: { accounts_id, author, content } } },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({
      message: 'Reply added successfully',
      replies: updatedComment.replies
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
