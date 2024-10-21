const express = require("express");
const {
    createAccount,
    deleteAccount,
    changePassword,
    changePrivilege,
    renameAccount,
    getAllAccounts,
    getAccountById,
    getFilteredAccounts,
    login,
    logout,
} = require("../controllers/accountController");
const authMiddleware = require("../middleware/auth");
const authorizationMiddleware = require("../middleware/authorization");

const router = express.Router();

router.post("/create", createAccount);
router.delete(
    "/:id/delete",
    authMiddleware,
    authorizationMiddleware("admin"),
    deleteAccount
);
router.put("/:id/password", authMiddleware, changePassword);
router.put(
    "/:id/privilege",
    authMiddleware,
    authorizationMiddleware("admin"),
    changePrivilege
);
router.put("/:id/rename", authMiddleware, renameAccount);
router.get("/", authMiddleware, getAllAccounts);
router.get("/:id", authMiddleware, getAccountById);
router.get("/filter", authMiddleware, getFilteredAccounts);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

module.exports = router;
