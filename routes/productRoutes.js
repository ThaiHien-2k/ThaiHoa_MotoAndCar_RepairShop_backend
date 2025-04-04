const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProductsByName,
  updateStock,
  applyDiscount,
  getProductsByStatus,
  getRelatedProducts
} = require('../controllers/productController');


const router = express.Router();

router.post('/', authMiddleware(["0", "1"]), createProduct);

router.delete('/:id', authMiddleware(["0", "1"]), deleteProduct);

router.put('/:id', authMiddleware(["0", "1"]), updateProduct);

router.get('/', getAllProducts);

router.get('/:id', getProductById);



module.exports = router;
