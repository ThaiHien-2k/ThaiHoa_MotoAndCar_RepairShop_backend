const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware(['0', '1']), orderController.createOrder);
router.get('/', authMiddleware(['0', '1']), orderController.getAllOrders);
router.get('/:id', authMiddleware(['0', '1']), orderController.getOrderById);
router.put('/:id', authMiddleware(['0', '1']), orderController.updateOrder);
router.delete('/:id', authMiddleware(['0', '1']), orderController.deleteOrder);
router.patch('/:id/status', authMiddleware(['0', '1']), orderController.updateOrderStatus);
router.get('/search', authMiddleware(['0', '1']), orderController.searchOrders);
router.patch('/:id/items', authMiddleware(['0', '1']), orderController.updateOrderItems);
router.patch('/:id/shipping', authMiddleware(['0', '1']), orderController.updateShippingInfo);
router.get('/customer/:customerId', authMiddleware(['0', '1']), orderController.getOrdersByCustomerId);
router.patch('/:id/cancel', authMiddleware(['0', '1']), orderController.cancelOrder);

module.exports = router;