const Supplier = require('../models/suppliersModel');

exports.createSupplier = async (req, res) => {
  try {
    const { phone, email } = req.body;

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const newSupplier = new Supplier(req.body);
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSuppliers = async (req, res) => {
  try {
    const { status, name, page = 1, limit = 10 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (name) query.name = { $regex: name, $options: 'i' };

    const suppliers = await Supplier.find(query)
      .populate('productsSupplied')
      .limit(parseInt(limit))
      .skip((page - 1) * limit);

    const total = await Supplier.countDocuments(query);
    res.status(200).json({ total, suppliers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id).populate('productsSupplied');
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSupplier) return res.status(404).json({ message: 'Supplier not found' });
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier) return res.status(404).json({ message: 'Supplier not found' });
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
