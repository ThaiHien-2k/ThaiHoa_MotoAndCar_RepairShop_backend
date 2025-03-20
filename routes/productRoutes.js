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

router.get('/category/:category_id', getProductsByCategory);

router.get('/search', searchProductsByName);

router.patch('/:id/stock', authMiddleware(["0", "1"]), updateStock);

router.patch('/:id/discount', authMiddleware(["0", "1"]), applyDiscount);

router.get('/status/:status', getProductsByStatus);

router.get('/:id/related', getRelatedProducts);


module.exports = router;
