// routes/accountRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
  changePassword,
  toggleAccountStatus,
  filterAccountsByPrivilege,
  updateAccountName,
  getActiveAccounts,
  changeAccountPrivilege,
  login,
  logout,
  forgotPassword
} = require('../controllers/accountController');

const router = express.Router();

router.post('/', createAccount);
router.get('/', authMiddleware(["0", "1"]), getAllAccounts);
router.get('/:id', authMiddleware(["0", "1"]), getAccountById);
router.put('/:id', authMiddleware(["0", "1"]), updateAccount);
router.delete('/:id', authMiddleware(["0", "1"]), deleteAccount);
router.put('/:id/password', authMiddleware(["0", "1"]), changePassword);
router.patch('/:id/status', authMiddleware(["0", "1"]), toggleAccountStatus);
router.get('/filter/privilege/:privilege', authMiddleware(["0", "1"]), filterAccountsByPrivilege);
router.put('/:id/name', authMiddleware(["0", "1"]), updateAccountName);
router.get('/active', authMiddleware(["0", "1"]), getActiveAccounts);
router.put('/:id/privilege', authMiddleware(["0", "1"]), changeAccountPrivilege);

// Auth routes
router.post('/login', login);
router.post('/logout', authMiddleware(["0", "1"]), logout);
router.post('/forgot-password', forgotPassword);

module.exports = router;
