const PurchaseHistory = require('../models/purchaseHistoryModel');

exports.createPurchase = async (req, res) => {
  try {
    const purchase = new PurchaseHistory(req.body);
    await purchase.save();
    res.status(201).json(purchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPurchases = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const purchases = await PurchaseHistory.find()
      .populate('customerId')
      .populate('items.productId')
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip((page - 1) * limit);
    const total = await PurchaseHistory.countDocuments();
    res.status(200).json({ total, purchases });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPurchaseById = async (req, res) => {
  try {
    const purchase = await PurchaseHistory.findById(req.params.id)
      .populate('customerId')
      .populate('items.productId');
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePurchase = async (req, res) => {
  try {
    const purchase = await PurchaseHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });
    res.status(200).json(purchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePurchase = async (req, res) => {
  try {
    const purchase = await PurchaseHistory.findByIdAndDelete(req.params.id);
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });
    res.status(200).json({ message: 'Purchase deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.filterPurchases = async (req, res) => {
  try {
    const { startDate, endDate, payment_method, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    if (payment_method) filter.payment_method = payment_method;
    const purchases = await PurchaseHistory.find(filter)
      .populate('customerId')
      .populate('items.productId')
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip((page - 1) * limit);
    const total = await PurchaseHistory.countDocuments(filter);
    res.status(200).json({ total, purchases });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRevenueStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const filter = {};
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    const stats = await PurchaseHistory.aggregate([
      { $match: filter },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" }, totalOrders: { $sum: 1 } } }
    ]);
    res.status(200).json(stats[0] || { totalRevenue: 0, totalOrders: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerHistory = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const purchases = await PurchaseHistory.find({ customerId })
      .populate('items.productId')
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip((page - 1) * limit);
    const total = await PurchaseHistory.countDocuments({ customerId });
    res.status(200).json({ total, purchases });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkInvoiceExists = async (req, res) => {
  try {
    const { invoice_number } = req.params;
    const purchase = await PurchaseHistory.findOne({ invoice_number });
    if (!purchase) return res.status(404).json({ message: "Invoice not found" });
    res.status(200).json({ exists: true, purchase });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
