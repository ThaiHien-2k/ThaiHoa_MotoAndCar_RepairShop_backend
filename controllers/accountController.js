const Account = require("../models/accountModel");
const bcrypt = require("bcrypt");

exports.createAccount = async (req, res) => {
    const { name, email, password, privilege } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAccount = new Account({
            name,
            email,
            password: hashedPassword,
            privilege,
        });

        await newAccount.save();
        res.status(201).json({
            message: "Account created successfully",
            newAccount,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAccount = async (req, res) => {
    const { id } = req.params;

    try {
        const account = await Account.findByIdAndDelete(id);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.changePassword = async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const account = await Account.findByIdAndUpdate(id, {
            password: hashedPassword,
        });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.changePrivilege = async (req, res) => {
    const { id } = req.params;
    const { newPrivilege } = req.body;

    try {
        const account = await Account.findByIdAndUpdate(
            id,
            { privilege: newPrivilege },
            { new: true }
        );
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json({ message: "Privilege updated successfully", account });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.renameAccount = async (req, res) => {
    const { id } = req.params;
    const { newName } = req.body;

    try {
        const account = await Account.findByIdAndUpdate(
            id,
            { name: newName },
            { new: true }
        );
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json({ message: "Name updated successfully", account });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAccountById = async (req, res) => {
    const { id } = req.params;

    try {
        const account = await Account.findById(id);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFilteredAccounts = async (req, res) => {
    const { privilege, name, createdAt } = req.query;
    let filter = {};

    if (privilege) {
        filter.privilege = privilege;
    }

    if (name) {
        filter.name = { $regex: name, $options: "i" };
    }

    if (createdAt) {
        filter.createdAt = { $gte: new Date(createdAt) };
    }

    try {
        const accounts = await Account.find(filter);
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
