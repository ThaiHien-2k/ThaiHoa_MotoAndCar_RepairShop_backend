const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  createComment,
  getCommentsByProductId,
  updateComment,
  deleteComment,
  likeComment,
  replyToComment,
  getRepliesByCommentId,
  changeCommentStatus,
  getAllComments,
  addReply,
  getCommentsById
} = require('../controllers/productCommentController');

const router = express.Router();

router.post('/', authMiddleware(["0", "1"]), createComment);
router.get('/', authMiddleware(["0", "1"]), getAllComments);
router.get('/product/:product_id', getCommentsByProductId);
router.get('/:id',authMiddleware(["0", "1"]), getCommentsById);
router.put('/:id', authMiddleware(["0", "1"]), updateComment);
router.delete('/:id', authMiddleware(["0", "1"]), deleteComment);
router.patch('/:id/like', likeComment);
router.post('/:id/reply', authMiddleware(["0", "1"]), replyToComment);
router.get('/replies/:id', getRepliesByCommentId);
router.patch('/:id/status', authMiddleware(["0", "1"]), changeCommentStatus);
router.post('/:id/replies', authMiddleware(["0", "1"]), addReply);

module.exports = router;
