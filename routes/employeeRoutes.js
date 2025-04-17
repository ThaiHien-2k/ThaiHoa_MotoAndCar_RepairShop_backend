const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  createEmployee,
  getAllEmployees,
  getActiveEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  updateEmployeeStatus,
  updateEmployeeSalary,
  addPerformanceReview,
  addLeaveRecord,
  searchEmployees,
  hasEmployee
} = require('../controllers/employeeController');


const router = express.Router();

router.post('/', authMiddleware(["0", "1"]), createEmployee);
router.get('/', authMiddleware(["0", "1"]), getAllEmployees);
router.get('/active', authMiddleware(["0", "1"]), getActiveEmployees);
router.get('/search', authMiddleware(["0", "1"]), searchEmployees);
router.get('/:id', authMiddleware(["0", "1"]), getEmployeeById);
router.put('/:id', authMiddleware(["0", "1"]), updateEmployee);
router.delete('/:id', authMiddleware(["0", "1"]), deleteEmployee);
router.patch('/:id/status', authMiddleware(["0", "1"]), updateEmployeeStatus);
router.patch('/:id/salary', authMiddleware(["0", "1"]), updateEmployeeSalary);
router.patch('/:id/performance-review', authMiddleware(["0", "1"]), addPerformanceReview);
router.patch('/:id/leave-record', authMiddleware(["0", "1"]), addLeaveRecord);
router.post('/has_employee', authMiddleware(["0", "1"]), hasEmployee);


module.exports = router;