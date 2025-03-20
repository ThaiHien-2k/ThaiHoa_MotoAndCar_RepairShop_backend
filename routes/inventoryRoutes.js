const express = require('express');
const router = express.Router();
const {
  createInventory,
  getInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
  getLowStock,
  adjustInventory,
  getExpiringSoon
} = require('../controllers/inventoryController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware(['0', '1']), createInventory);
router.get('/', authMiddleware(['0', '1']), getInventory);
router.get('/:id', authMiddleware(['0', '1']), getInventoryById);
router.put('/:id', authMiddleware(['0', '1']), updateInventory);
router.delete('/:id', authMiddleware(['0', '1']), deleteInventory);
router.get('/low-stock', authMiddleware(['0', '1']), getLowStock);
router.patch('/:id/adjust', authMiddleware(['0', '1']), adjustInventory);
router.get('/expiring-soon', authMiddleware(['0', '1']), getExpiringSoon);

module.exports = router;