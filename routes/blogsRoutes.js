const express = require('express');
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  toggleBlogStatus,
  increaseViews,
  toggleLike,
  getRelatedBlogs,
  getTopBlogs,
  searchBlogs
} = require('../controllers/blogsController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware(["0", "1"]), createBlog);

router.get('/', getBlogs);
router.get('/popular', getTopBlogs);
router.get('/search', searchBlogs);
router.get('/:id', getBlogById);
router.get('/:id/related', getRelatedBlogs);

router.put('/:id', authMiddleware(["0", "1"]), updateBlog);
router.delete('/:id', authMiddleware(["0", "1"]), deleteBlog);

router.patch('/:id/status', authMiddleware(["0", "1"]), toggleBlogStatus);

router.patch('/:id/views', increaseViews);

router.patch('/:id/like', authMiddleware(["0", "1", "2"]), toggleLike);

module.exports = router;
