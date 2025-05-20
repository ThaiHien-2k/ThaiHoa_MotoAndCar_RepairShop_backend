const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  createComment,
  getCommentsByBlogId,
  getCommentById,
  updateComment,
  deleteComment,
  toggleCommentStatus,
  likeComment,
  replyToComment,
  getRepliesByCommentId,
  changeCommentStatus,
  getAllComments,
  addReply
} = require('../controllers/blogCommentsController');

router.post('/', authMiddleware(['0', '1', '2']), createComment);
router.get('/', authMiddleware(['0', '1']), getAllComments);
router.get('/blogId/:blogId', authMiddleware(['0', '1', '2']), getCommentsByBlogId);
router.get('/detail/:commentId', authMiddleware(['0', '1']), getCommentById);
router.put('/:commentId', authMiddleware(['0', '1']), updateComment);
router.delete('/:commentId', authMiddleware(['0']), deleteComment);
router.patch('/:commentId/status', authMiddleware(['0']), toggleCommentStatus);
router.patch('/:commentId/like', authMiddleware(['0', '1', '2']), likeComment);
router.post('/:commentId/reply', authMiddleware(['0', '1', '2']), replyToComment);
router.get('/:commentId/replies', authMiddleware(['0', '1', '2']), getRepliesByCommentId);
router.patch('/:commentId/change-status', authMiddleware(['0']), changeCommentStatus);
router.post('/add-reply', authMiddleware(['0', '1', '2']), addReply);

module.exports = router;
