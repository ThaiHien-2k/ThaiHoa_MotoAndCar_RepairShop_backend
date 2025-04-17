const Employee = require('../models/employeeModel');

exports.createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getActiveEmployees = async (req, res) => {
  try {
    const activeEmployees = await Employee.find({ status: 'active' });
    res.status(200).json(activeEmployees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmployeeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee status updated successfully', employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmployeeSalary = async (req, res) => {
  try {
    const { salary } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, { salary }, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee salary updated successfully', employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addPerformanceReview = async (req, res) => {
  try {
    const { performance_review } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, { $push: { performance_reviews: performance_review } }, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Performance review added successfully', employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addLeaveRecord = async (req, res) => {
  try {
    const { leave_record } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, { $push: { leave_records: leave_record } }, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Leave record added successfully', employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchEmployees = async (req, res) => {
  try {
    const { name, position, employment_type, status } = req.query;
    const query = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (position) query.position = position;
    if (employment_type) query.employment_type = employment_type;
    if (status) query.status = status;
    const employees = await Employee.find(query);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.hasEmployee = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ exists: false, message: 'Missing account ID in request body' });
    }

    const employee = await Employee.findOne({ accounts_id: id });

    if (!employee) {
      return res.status(200).json({ exists: false, message: 'Employee not found' });
    }

    return res.status(200).json({ exists: true, employee });
  } catch (error) {
    console.error('Error checking employee:', error);
    return res.status(500).json({ exists: false, message: 'Internal server error' });
  }
};