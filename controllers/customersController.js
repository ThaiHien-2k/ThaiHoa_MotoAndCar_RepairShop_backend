const Customer = require('../models/customersModel');

exports.createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, type, minPoints, maxPoints } = req.query;

    const filters = {};
    if (search) filters.$or = [
      { name: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') },
      { phone: new RegExp(search, 'i') }
    ];
    if (type) filters.customer_type = type;
    if (minPoints) filters.loyalty_points = { $gte: parseInt(minPoints) };
    if (maxPoints) filters.loyalty_points = { ...filters.loyalty_points, $lte: parseInt(maxPoints) };

    const customers = await Customer.find(filters)
      .limit(parseInt(limit))
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Customer.countDocuments(filters);

    res.status(200).json({ total, page, limit, customers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerByAccountId = async (req, res) => {
  try {
    const customer = await Customer.findOne({ accounts_id: req.params.accountId });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLoyaltyPoints = async (req, res) => {
  try {
    const { points } = req.body;
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    customer.loyalty_points += points;
    await customer.save();

    res.status(200).json({ message: 'Loyalty points updated', loyalty_points: customer.loyalty_points });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomersByReferralCode = async (req, res) => {
  try {
    const customers = await Customer.find({ referral_code: req.params.referralCode });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
