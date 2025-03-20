const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  createPurchase,
  getPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
  filterPurchases,
  getRevenueStats,
  getCustomerHistory,
  checkInvoiceExists
} = require('../controllers/purchaseHistoryController');

router.post('/', authMiddleware(['0', '1']), createPurchase);
router.get('/', authMiddleware(['0', '1', '2']), getPurchases);
router.get('/filter', authMiddleware(['0', '1', '2']), filterPurchases);
router.get('/revenue', authMiddleware(['0']), getRevenueStats);
router.get('/customer/:customerId', authMiddleware(['0', '1', '2']), getCustomerHistory);
router.get('/invoice/:invoice_number', authMiddleware(['0', '1']), checkInvoiceExists);
router.get('/:id', authMiddleware(['0', '1', '2']), getPurchaseById);
router.put('/:id', authMiddleware(['0', '1']), updatePurchase);
router.delete('/:id', authMiddleware(['0']), deletePurchase);

module.exports = router;
