const ProductComment = require('../models/productCommentModel');

exports.createComment = async (req, res) => {
    try {
      const { product_id, customer_id, rating, comment, imageUploads, isVerifiedPurchase } = req.body;
  
      if (!product_id || !customer_id || !rating || !comment) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const newComment = new ProductComment({
        product_id,
        customer_id,
        rating,
        comment,
        imageUploads: imageUploads || [],
        isVerifiedPurchase: isVerifiedPurchase || false
      });
  
      await newComment.save();
  
      res.status(201).json({
        message: 'Comment created successfully',
        comment: newComment
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

exports.getCommentsByProductId = async (req, res) => {
  try {
    const product_id = req.params.product_id;
    const comments = await ProductComment.find({ product_id }).populate('customer_id', 'name');

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, rating, imageUploads, isVerifiedPurchase } = req.body;

    const updatedComment = await ProductComment.findByIdAndUpdate(
      id,
      { comment, rating, imageUploads, isVerifiedPurchase, editedAt: Date.now() },
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

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await ProductComment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.likeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComment = await ProductComment.findByIdAndUpdate(
      id,
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

exports.replyToComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { accounts_id, author, content } = req.body;

    const updatedComment = await ProductComment.findByIdAndUpdate(
      id,
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

exports.getRepliesByCommentId = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await ProductComment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(comment.replies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changeCommentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'pending', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedComment = await ProductComment.findByIdAndUpdate(
      id,
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


exports.getAllComments = async (req, res) => {
  try {
    const comments = await ProductComment.find()
      // .populate('customer_id', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommentsById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await ProductComment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.addReply = async (req, res) => {
  try {
    const { comment_id, accounts_id, author, content } = req.body;

    if (!comment_id || !accounts_id || !author || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const updatedComment = await ProductComment.findByIdAndUpdate(
      comment_id,
      {
        $push: {
          replies: {
            accounts_id,
            author,
            content
          }
        }
      },
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