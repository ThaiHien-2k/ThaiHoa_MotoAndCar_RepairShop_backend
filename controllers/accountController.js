const Account = require('../models/accountModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createAccount = async (req, res) => {
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
      is_active
    });

    await newAccount.save();

    res.status(201).json({ message: 'Account created successfully', account: newAccount });
  } catch (error) {
    res.status(500).json({ message: 'Error creating account', error: error.message });
  }
};

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

    // if (!account.is_active) {
    //   return res.status(403).json({ message: 'Account is inactive' });
    // }

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
        privilege: account.privilege
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};


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
  
  exports.getAllAccounts = async (req, res) => {
    try {
      const accounts = await Account.find();
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching accounts', error });
    }
  };
  
  exports.getAccountById = async (req, res) => {
    try {
      const account = await Account.findById(req.params.id);
      if (!account) return res.status(404).json({ message: 'Account not found' });
  
      res.status(200).json(account);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching account', error });
    }
  };
  
  exports.updateAccount = async (req, res) => {
    try {
      const { name, privilege, password, role_description, is_active } = req.body;
  
      
      let hashedPassword = password;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }
  
      const updateData = {
        name,
        privilege,
        password: hashedPassword,
        role_description,
        is_active,
        updatedAt: Date.now(),
      };
  
      const updatedAccount = await Account.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!updatedAccount) {
        return res.status(404).json({ message: 'Account not found' });
      }
  
      res.status(200).json({ message: 'Update success' });
    } catch (error) {
      console.error('Error updating account:', error);
      res.status(500).json({ message: 'Error updating account', error });
    }
  };
  
  exports.deleteAccount = async (req, res) => {
    try {
      const deletedAccount = await Account.findByIdAndDelete(req.params.id);
      if (!deletedAccount) return res.status(404).json({ message: 'Account not found' });
  
      res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting account', error });
    }
  };
  
  exports.changePassword = async (req, res) => {
    try {
      const account = await Account.findById(req.params.id);
      if (!account) return res.status(404).json({ message: 'Account not found' });
  
      account.password = await bcrypt.hash(req.body.password, 10);
      await account.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error changing password', error });
    }
  };
  
  exports.toggleAccountStatus = async (req, res) => {
    try {
      const account = await Account.findById(req.params.id);
      if (!account) return res.status(404).json({ message: 'Account not found' });
  
      account.is_active = !account.is_active;
      await account.save();
  
      res.status(200).json({ message: 'Account status updated', account });
    } catch (error) {
      res.status(500).json({ message: 'Error toggling account status', error });
    }
  };
  
  exports.filterAccountsByPrivilege = async (req, res) => {
    try {
      const accounts = await Account.find({ privilege: req.params.privilege });
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ message: 'Error filtering accounts', error });
    }
  };
  
  exports.updateAccountName = async (req, res) => {
    try {
      const account = await Account.findById(req.params.id);
      if (!account) return res.status(404).json({ message: 'Account not found' });
  
      account.name = req.body.name;
      await account.save();
  
      res.status(200).json({ message: 'Account name updated successfully', account });
    } catch (error) {
      res.status(500).json({ message: 'Error updating account name', error });
    }
  };
  
  exports.getActiveAccounts = async (req, res) => {
    try {
      const activeAccounts = await Account.find({ is_active: true });
      res.status(200).json(activeAccounts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching active accounts', error });
    }
  };
  
  exports.changeAccountPrivilege = async (req, res) => {
    try {
      const account = await Account.findById(req.params.id);
      if (!account) return res.status(404).json({ message: 'Account not found' });
  
      account.privilege = req.body.privilege;
      await account.save();
  
      res.status(200).json({ message: 'Account privilege updated successfully', account });
    } catch (error) {
      res.status(500).json({ message: 'Error updating account privilege', error });
    }
  };