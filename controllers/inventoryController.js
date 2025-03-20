const Inventory = require('../models/inventoryModel');

exports.createInventory = async (req, res) => {
  try {
    const inventory = new Inventory(req.body);
    await inventory.save();
    res.status(201).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate('productId');
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id).populate('productId');
    if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
    res.status(200).json({ message: 'Inventory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLowStock = async (req, res) => {
  try {
    const inventory = await Inventory.find({ quantity: { $lte: '$reorder_threshold' } }).populate('productId');
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.adjustInventory = async (req, res) => {
  try {
    const { quantityChange, updatedBy } = req.body;
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) return res.status(404).json({ message: 'Inventory not found' });

    inventory.quantity += quantityChange;
    inventory.updateHistory.push({ quantityChange, updatedBy });
    inventory.updatedAt = Date.now();

    await inventory.save();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExpiringSoon = async (req, res) => {
  try {
    const today = new Date();
    const upcomingDate = new Date();
    upcomingDate.setMonth(upcomingDate.getMonth() + 1);

    const inventory = await Inventory.find({ expiration_date: { $gte: today, $lte: upcomingDate } }).populate('productId');
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
