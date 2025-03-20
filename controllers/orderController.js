const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, shipment_status, paymentStatus } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status, shipment_status, paymentStatus }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchOrders = async (req, res) => {
  try {
    const { status, paymentMethod, shipment_status, customerId } = req.query;
    const query = {};
    if (status) query.status = status;
    if (paymentMethod) query.paymentMethod = paymentMethod;
    if (shipment_status) query.shipment_status = shipment_status;
    if (customerId) query.customerId = customerId;

    const orders = await Order.find(query);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderItems = async (req, res) => {
  try {
    const { items, services } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { items, services }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order items updated successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateShippingInfo = async (req, res) => {
  try {
    const { tracking_number, shippingAddress } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { tracking_number, shippingAddress }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Shipping info updated successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrdersByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const orders = await Order.find({ customerId });
    if (!orders.length) return res.status(404).json({ message: 'No orders found for this customer' });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order cancelled successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
