const RepairAppointment = require('../models/repairAppointmentsModel');

exports.createRepairAppointment = async (req, res) => {
  try {
    const newAppointment = new RepairAppointment(req.body);
    await newAppointment.save();
    res.status(201).json({ message: 'Repair appointment created successfully', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRepairAppointments = async (req, res) => {
  try {
    const appointments = await RepairAppointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRepairAppointmentById = async (req, res) => {
  try {
    const appointment = await RepairAppointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Repair appointment not found' });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRepairAppointment = async (req, res) => {
  try {
    const updatedAppointment = await RepairAppointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAppointment) return res.status(404).json({ message: 'Repair appointment not found' });
    res.status(200).json({ message: 'Repair appointment updated successfully', appointment: updatedAppointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRepairAppointment = async (req, res) => {
  try {
    const deletedAppointment = await RepairAppointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) return res.status(404).json({ message: 'Repair appointment not found' });
    res.status(200).json({ message: 'Repair appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await RepairAppointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Repair appointment not found' });

    appointment.status = status;
    appointment.appointment_status_history.push({ status, date: new Date() });
    await appointment.save();

    res.status(200).json({ message: 'Appointment status updated successfully', appointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAppointmentsByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const appointments = await RepairAppointment.find({ customerId });
    if (!appointments.length) return res.status(404).json({ message: 'No repair appointments found for this customer' });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCustomerFeedback = async (req, res) => {
    try {
      const { feedback } = req.body;
      const appointment = await RepairAppointment.findById(req.params.id);
      if (!appointment) return res.status(404).json({ message: 'Repair appointment not found' });
  
      appointment.customer_feedback = feedback;
      await appointment.save();
  
      res.status(200).json({ message: 'Customer feedback updated successfully', appointment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
