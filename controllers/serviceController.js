const Service = require('../models/serviceModel');

exports.createService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json({ message: 'Service created successfully', service: newService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json({ message: 'Service updated successfully', service: updatedService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getActiveServices = async (req, res) => {
  try {
    const activeServices = await Service.find({ status: 'active' });
    res.status(200).json(activeServices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchServices = async (req, res) => {
  try {
    const { name, category_id, status } = req.query;
    const query = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (category_id) query.category_id = category_id;
    if (status) query.status = status;

    const services = await Service.find(query);
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateServiceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedService = await Service.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedService) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json({ message: 'Service status updated successfully', service: updatedService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
