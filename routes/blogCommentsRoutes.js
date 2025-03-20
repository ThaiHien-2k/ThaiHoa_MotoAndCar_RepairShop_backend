const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  createComment,
  getCommentsByBlogId,
  getCommentById,
  updateComment,
  deleteComment,
  toggleCommentStatus
} = require('../controllers/blogCommentsController');

router.post('/', authMiddleware(['0', '1', '2']), createComment);
router.get('/:blogId', authMiddleware(['0', '1', '2']), getCommentsByBlogId);
router.get('/detail/:commentId', authMiddleware(['0', '1']), getCommentById);
router.put('/:commentId', authMiddleware(['0', '1']), updateComment);
router.delete('/:commentId', authMiddleware(['0']), deleteComment);
router.patch('/:commentId/status', authMiddleware(['0']), toggleCommentStatus);

module.exports = router;
