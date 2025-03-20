const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  getActiveServices,
  searchServices,
  updateServiceStatus
} = require('../controllers/serviceController');

const router = express.Router();

router.post('/', authMiddleware(["0", "1"]), createService);
router.get('/', getAllServices);
router.get('/active', getActiveServices);
router.get('/search', searchServices);
router.get('/:id', getServiceById);
router.put('/:id', authMiddleware(["0", "1"]), updateService);
router.delete('/:id', authMiddleware(["0", "1"]), deleteService);
router.patch('/:id/status', authMiddleware(["0", "1"]), updateServiceStatus);

module.exports = router;
