const express = require('express');
const router = express.Router();
const {
  createRepairHistory,
  getAllRepairHistories,
  getRepairHistoryById,
  updateRepairHistory,
  deleteRepairHistory,
  getRepairHistoryByCustomer,
} = require('../controllers/repairHistoryController');
const authMiddleware = require('../middleware/auth');

router
  .route('/')
  .post(authMiddleware(['0', '1']), createRepairHistory)
  .get(authMiddleware(['0', '1', '2']), getAllRepairHistories);

router
  .route('/:id')
  .get(authMiddleware(['0', '1', '2']), getRepairHistoryById)
  .put(authMiddleware(['0', '1']), updateRepairHistory)
  .delete(authMiddleware(['0']), deleteRepairHistory);

router.get('/customer/:customerId', authMiddleware(['0', '1', '2']), getRepairHistoryByCustomer);

module.exports = router;
