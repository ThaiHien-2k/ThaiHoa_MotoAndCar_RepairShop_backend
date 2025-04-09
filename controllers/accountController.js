const Account = require('../models/accountModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatar/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Temporary name
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.gif') {
      return cb(new Error('Only image files are allowed.'));
    }
    cb(null, true);
  },
}).single('avatar'); // Use single file upload for avatar

// Create a new account
exports.createAccount = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { name, email, password, privilege, role_description, is_active } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const normalizedEmail = email.toLowerCase().trim();

      const existingAccount = await Account.findOne({ email: normalizedEmail });
      if (existingAccount) {
        return res.status(409).json({ message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAccount = new Account({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        privilege,
        role_description,
        is_active,
        avatar: null, // Temporary, will update after renaming the file
      });

      await newAccount.save();

      // Rename uploaded avatar file to include the account ID
      if (req.file) {
        const newFilename = `${newAccount._id}${path.extname(req.file.originalname)}`;
        fs.renameSync(`uploads/avatar/${req.file.filename}`, `uploads/avatar/${newFilename}`);
        newAccount.avatar = newFilename;
        await newAccount.save();
      }

      res.status(201).json({ message: 'Account created successfully', account: newAccount });
    } catch (error) {
      res.status(500).json({ message: 'Error creating account', error: error.message });
    }
  });
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const account = await Account.findOne({ email: normalizedEmail });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: account._id, privilege: account.privilege },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: account._id,
        name: account.name,
        email: account.email,
        privilege: account.privilege,
        avatar: account.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};


// Logout
exports.logout = (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out', error });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const account = await Account.findOne({ email });

    if (!account) return res.status(404).json({ message: 'Account not found' });

    account.password = await bcrypt.hash(newPassword, 10);
    await account.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error });
  }
};

// Get all accounts
exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accounts', error });
  }
};

// Get account by ID
exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ message: 'Account not found' });

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching account', error });
  }
};

// Update an existing account
exports.updateAccount = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { name, privilege, role_description, is_active } = req.body;

      const updateData = {
        name,
        privilege,
        role_description,
        is_active,
        updatedAt: Date.now(),
      };

      // If a new avatar is uploaded, rename it and update the avatar field
      if (req.file) {
        const newFilename = `${req.params.id}${path.extname(req.file.originalname)}`;
        fs.renameSync(`uploads/avatar/${req.file.filename}`, `uploads/avatar/${newFilename}`);
        updateData.avatar = newFilename;
      }

      const updatedAccount = await Account.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!updatedAccount) {
        return res.status(404).json({ message: 'Account not found' });
      }

      res.status(200).json({ message: 'Account updated successfully', account: updatedAccount });
    } catch (error) {
      res.status(500).json({ message: 'Error updating account', error: error.message });
    }
  });
};

// Delete an account
exports.deleteAccount = async (req, res) => {
  try {
    const deletedAccount = await Account.findByIdAndDelete(req.params.id);
    if (!deletedAccount) return res.status(404).json({ message: 'Account not found' });

    // Delete the avatar file if it exists
    if (deletedAccount.avatar) {
      const avatarPath = `uploads/avatar/${deletedAccount.avatar}`;
      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath);
      }
    }

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting account', error });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const { oldPassword, newPassword } = req.body.oldPassword;

    const isMatch = await bcrypt.compare(oldPassword, account.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    account.password = await bcrypt.hash(newPassword, 10);
    await account.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Error changing password', error });
  }
};

