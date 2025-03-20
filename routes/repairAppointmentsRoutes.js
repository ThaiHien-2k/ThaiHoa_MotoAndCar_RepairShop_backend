const express = require('express');
const router = express.Router();
const {
  createRepairAppointment,
  getAllRepairAppointments,
  getRepairAppointmentById,
  updateRepairAppointment,
  deleteRepairAppointment,
  updateAppointmentStatus,
  getAppointmentsByCustomerId,
  updateCustomerFeedback
} = require('../controllers/repairAppointmentsController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware(["0", "1"]), createRepairAppointment);
router.get('/', getAllRepairAppointments);
router.get('/:id', getRepairAppointmentById);
router.put('/:id', authMiddleware(["0", "1"]), updateRepairAppointment);
router.delete('/:id', authMiddleware(["0", "1"]), deleteRepairAppointment);
router.patch('/:id/status', authMiddleware(["0", "1"]), updateAppointmentStatus);
router.get('/customer/:customerId', getAppointmentsByCustomerId);
router.patch('/:id/feedback', updateCustomerFeedback);

module.exports = router;