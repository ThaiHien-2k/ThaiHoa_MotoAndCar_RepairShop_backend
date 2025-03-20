const express = require('express');
const router = express.Router();
const {
  createPromotion,
  getPromotions,
  getPromotionById,
  updatePromotion,
  deletePromotion,
  togglePromotionStatus,
  applyPromotionCode
} = require('../controllers/promotionsController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware(['0', '1']), createPromotion);
router.get('/', authMiddleware(['0', '1']), getPromotions);
router.get('/:id', authMiddleware(['0', '1']), getPromotionById);
router.put('/:id', authMiddleware(['0', '1']), updatePromotion);
router.delete('/:id', authMiddleware(['0', '1']), deletePromotion);
router.patch('/:id/status', authMiddleware(['0', '1']), togglePromotionStatus);
router.post('/apply', authMiddleware(['0', '1']), applyPromotionCode);

module.exports = router;