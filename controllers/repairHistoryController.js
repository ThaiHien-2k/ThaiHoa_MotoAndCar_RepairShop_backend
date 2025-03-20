const RepairHistory = require('../models/repairHistoryModel');

exports.createRepairHistory = async (req, res) => {
  try {
    const newRepair = new RepairHistory(req.body);
    await newRepair.save();
    res.status(201).json(newRepair);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllRepairHistories = async (req, res) => {
  try {
    const repairHistories = await RepairHistory.find()
      .populate('customerId', 'name email')
      .populate('serviceId', 'name')
      .populate('technician_id', 'name');
    res.status(200).json(repairHistories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRepairHistoryById = async (req, res) => {
  try {
    const repairHistory = await RepairHistory.findById(req.params.id)
      .populate('customerId', 'name email')
      .populate('serviceId', 'name')
      .populate('technician_id', 'name');
    if (!repairHistory) return res.status(404).json({ error: 'Repair history not found' });
    res.status(200).json(repairHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRepairHistory = async (req, res) => {
  try {
    const { repair_status } = req.body;
    const updatedRepair = await RepairHistory.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedAt: Date.now(),
        $push: { status_history: { status: repair_status, changedBy: req.user._id } },
      },
      { new: true }
    );
    if (!updatedRepair) return res.status(404).json({ error: 'Repair history not found' });
    res.status(200).json(updatedRepair);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRepairHistory = async (req, res) => {
  try {
    const deletedRepair = await RepairHistory.findByIdAndDelete(req.params.id);
    if (!deletedRepair) return res.status(404).json({ error: 'Repair history not found' });
    res.status(200).json({ message: 'Repair history deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRepairHistoryByCustomer = async (req, res) => {
  try {
    const repairHistories = await RepairHistory.find({ customerId: req.params.customerId })
      .populate('serviceId', 'name')
      .populate('technician_id', 'name');
    res.status(200).json(repairHistories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
