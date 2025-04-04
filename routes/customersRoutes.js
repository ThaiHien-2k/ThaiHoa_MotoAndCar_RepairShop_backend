const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customersController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware(['0', '1']), customerController.createCustomer);
router.get('/', authMiddleware(['0', '1', '2']), customerController.getAllCustomers);
router.get('/:id', authMiddleware(['0', '1', '2']), customerController.getCustomerById);
router.put('/:id', authMiddleware(['0', '1']), customerController.updateCustomer);
router.delete('/:id', authMiddleware(['0']), customerController.deleteCustomer);
router.get('/account/:accountId', authMiddleware(['0', '1', '2']), customerController.getCustomerByAccountId);
router.post('/has_customer', authMiddleware(["0", "1"]), customerController.hasCustomer);


module.exports = router;
