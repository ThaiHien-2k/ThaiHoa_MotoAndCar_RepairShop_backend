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

const router = express.Router();

router.post("/create", createAccount);
router.delete("/:id/delete", authMiddleware("admin"), deleteAccount);
router.put("/:id/password", authMiddleware(), changePassword); // No specific privilege needed
router.put("/:id/privilege", authMiddleware("admin"), changePrivilege);
router.put("/:id/rename", authMiddleware(), renameAccount); // No specific privilege needed
router.get("/", authMiddleware(), getAllAccounts); // No specific privilege needed
router.get("/:id", authMiddleware(), getAccountById); // No specific privilege needed
router.get("/filter", authMiddleware(), getFilteredAccounts); // No specific privilege needed
router.post("/login", login);
router.post("/logout", authMiddleware(), logout); // No specific privilege needed

module.exports = router;
