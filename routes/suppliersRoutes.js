const express = require('express');
const router = express.Router();

const {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
} = require('../controllers/suppliersController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware(['0', '1']), createSupplier);
router.get('/', authMiddleware(['0', '1']), getSuppliers);
router.get('/:id', authMiddleware(['0', '1']), getSupplierById);
router.put('/:id', authMiddleware(['0', '1']), updateSupplier);
router.delete('/:id', authMiddleware(['0', '1']), deleteSupplier);


module.exports = router;