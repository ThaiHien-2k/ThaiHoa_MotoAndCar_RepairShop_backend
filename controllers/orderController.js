const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/accountModel");

exports.createOrder = async (req, res) => {
    const userId = req.user._id; // Assuming user info is available in req.user
    const { products } = req.body; // Array of { productId, quantity }

    try {
        const totalAmount = await Promise.all(
            products.map(async (product) => {
                const item = await Product.findById(product.productId);
                return item.price * product.quantity;
            })
        );

        const newOrder = new Order({
            userId,
            products,
            totalAmount: totalAmount.reduce((acc, curr) => acc + curr, 0),
        });

        await newOrder.save();
        res.status(201).json({
            message: "Order created successfully",
            newOrder,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrdersByUserId = async (req, res) => {
    const userId = req.user._id; // Assuming user info is available in req.user

    try {
        const orders = await Order.find({ userId }).populate(
            "products.productId"
        );
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
