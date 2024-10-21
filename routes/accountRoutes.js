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
} = require("../controllers/accountController");

const router = express.Router();

router.post("/create", createAccount);

router.delete("/:id/delete", deleteAccount);

router.put("/:id/password", changePassword);

router.put("/:id/privilege", changePrivilege);

router.put("/:id/rename", renameAccount);

router.get("/", getAllAccounts);

router.get("/:id", getAccountById);

router.get("/filter", getFilteredAccounts);

module.exports = router;
