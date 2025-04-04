const express = require('express');
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware(['0', '1']), createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', authMiddleware(['0', '1']), updateCategory);
router.delete('/:id', authMiddleware(['0', '1']), deleteCategory);

module.exports = router;
